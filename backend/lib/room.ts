import { ServerWebSocket } from "bun";
import { Client, Color } from "./client";
import { WsMessage, WsMessageType } from "./wsMessage";
import { WsData } from "./wsData";
import { MinRoom } from "./min/minRoom";
import { MinGameState } from "./min/minGameState";
import { MinClient } from "./min/minClient";
import { MinGamePiece } from "./min/minGamePiece";
import { GameState } from "./gameState";

enum RoomStatus {
    LOBBY,
    PLAYING,
}

class Room {
    public static ROOMS: Room[] = [];

    public static readonly PATTERN_REGEX = /^[a-zA-Z0-9]{0,8}$/;
    public static readonly ID_PATTERN = "abcdefghijklmnopqrstuvwxyz0123456789";
    public static readonly DEFAULT_LENGTH = 8;

    public static getRoom(roomId: string): Room | null {
        return Room.ROOMS.find(r => r.roomId == roomId) ?? null;
    }
    
    public roomId: string;
    public roomStatus: RoomStatus = RoomStatus.LOBBY;
    public clients: Client[] = [];
    public roomMaster: Client;
    public currentGameState: GameState | null = null;

    constructor(roomMaster: Client) {
        this.clients.push(roomMaster);
        this.roomMaster = roomMaster;
        this.roomId = this.generateId(Room.DEFAULT_LENGTH);
    }

    public broadcast(message: WsMessage<unknown>): void {
        this.clients.forEach(c => c.send(message));
    }

    public broadcastRoomStatus(): void {
        const minClients: MinClient[] = [];
        const minRoomMaster: MinClient = new MinClient(this.roomMaster.ws.remoteAddress, this.roomMaster.color as number, this.roomMaster.isSpectator);
        
        this.clients.forEach(c => minClients.push(new MinClient(c.ws.remoteAddress, c.color as number, c.isSpectator)));

        this.broadcast(new WsMessage(WsMessageType.ROOM_STATUS, new MinRoom(
            this.roomId,
            this.roomStatus as number,
            minClients,
            minRoomMaster)));
    }

    public broadcastGameStatus(): void {
        if (!this.currentGameState) return;

        const minGamePieces: MinGamePiece[] = [];
        const minClients: MinClient[] = [];

        this.currentGameState.pieces.forEach(p => minGamePieces.push(new MinGamePiece(
            p.homePos,
            p.pos,
            p.color as number,
            p.initPos
            )));
        
        this.clients.forEach(c => minClients.push(new MinClient(
            c.ws.remoteAddress,
            c.color as number,
            c.isSpectator
        )));

        this.broadcast(new WsMessage(WsMessageType.GAME_STATUS, new MinGameState(
            minGamePieces,
            this.currentGameState.currentPlayerColor as number,
            this.currentGameState.diceThrow,
            )));
    }

    public getClient(ws: ServerWebSocket<WsData>): Client | null {
        return this.clients.find(c => c.equals(ws)) ?? null;
    }

    public addClient(client: Client): void {
        if (!this.clients.find(c => c.equals(client))) {
            this.clients.push(client);
        }
    }

    public sortClientsByColor() {
        this.clients.sort((a, b) => a.color - b.color);
    }

    public removeClient(client: Client | ServerWebSocket<WsData>): void {

        if (client instanceof Client) client = client.ws;

        if (!this.clients.find(c => c.equals(client))) return;
        
        for (let i = 0; i < this.clients.length; i++) {
            if (this.clients[i].equals(client)) {
                this.clients.splice(i);
                break;
            }
        }

        if (this.clients.length == 0) return this.delete();

        if (this.roomMaster.equals(client)) {
            this.roomMaster = this.clients[0];
        }
    }

    public isColorFree(color: Color): boolean {
        for (let i = 0; i < this.clients.length; i++) {
            if (this.clients[i].color == color) {
                return false;
            }
        }
        return true;
    }
    
    /*public getActiveColors(): Color[] {
        const colors: Color[] = [];
        this.clients.forEach(p => {
            if (p.isSpectator) return;
            colors.push(p.color);
        });
        return colors;
    } VVV  */
    public getActiveColors(): Color[] {
        return this.clients.map(c => c.color).filter(c => c != Color.NOT_SET);
    }

    public startGame(): void {
        this.currentGameState = new GameState(this);
    }

    public updateGameState(piece: MinGamePiece): boolean {
        if (!this.currentGameState) return false;
        return this.currentGameState.makeMoveWithPiece(piece);
    }
    
    public finishGame(): void {
        //TODO send finish message + last game state
        this.broadcastGameStatus();
        this.clients.forEach(c => c.finishGame(this.currentGameState?.currentPlayerColor as Color));
        this.delete();
    }

    public delete(): void {
        const index = Room.ROOMS.indexOf(this);
        if (index < 0) return;

        Room.ROOMS.splice(index, 1);
        return;
    }

    private generateId(length: number): string {
        let id = "";
        let patternLength = Room.ID_PATTERN.length;
        for (let i = 0; i < 8; i++) {
            id += Room.ID_PATTERN.charAt(Math.floor(Math.random() * patternLength));
        }
        
        return id;
    }

}

export { Room, RoomStatus };