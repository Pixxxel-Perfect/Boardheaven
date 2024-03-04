import { ServerWebSocket } from "bun";
import { Client } from "./client";
import { Game } from "./game";
import { WsMessage, WsMessageType } from "./wsMessage";
import { WsData } from "./wsData";
import { Player, PlayerColor } from "./player";
import { timingSafeEqual } from "crypto";

enum RoomStatus {
    LOBBY,
    PLAYING,
}

class Room {
    public static ROOMS: Room[] = [];

    public static readonly ID_PATTERN = "abcdefghijklmnopqrstuvwxyz0123456789";
    public static readonly DEFAULT_LENGTH = 8;

    public static getRoom(roomId: string): Room | null {
        return Room.ROOMS.find(r => r.roomId == roomId) ?? null;
    }
    
    public roomId: string;
    public roomStatus: RoomStatus = RoomStatus.LOBBY;
    public clients: Client[] = []
    public roomMaster: Client;
    public game?: Game;

    constructor(roomMaster: Client, roomId?: string) {
        this.clients.push(roomMaster);
        this.roomMaster = roomMaster;
        this.roomId = roomId ?? this.generateId(Room.DEFAULT_LENGTH);
    }

    public broadcast(message: WsMessage<unknown>): void {
        this.clients.forEach(c => c.send(message));
    }

    public broadcastRoomStatus() {
        this.broadcast(new WsMessage(WsMessageType.ROOM_STATUS, this));
    }

    public addClient(client: Client): void {
        if (!this.clients.find(c => c.equals(client))) {
            this.clients.push(client);
        }
    }

    public getClient(ws: ServerWebSocket<WsData>): Client | null {
        return this.clients.find(c => c.equals(ws)) ?? null;
    }

    public removeClient(client: Client): void {
        if (!this.clients.find(c => c.equals(client))) return;
        
        for (let i = 0; i < this.clients.length; i++) {
            if (this.clients[i].equals(client)) {
                this.clients.splice(i);
                break;
            }
        }

        if (this.clients.length == 0) {
            const index = Room.ROOMS.indexOf(this);
            if (index < 0) return;

            Room.ROOMS.splice(index, 1);
        }

        if (this.roomMaster.equals(client)) {
            this.roomMaster = this.clients[0];
        }
    }

    public startGameLobby() {
        this.game = new Game(Player.fromClients(this.clients));
    }

    public isColorFree(color: PlayerColor): boolean {
        return this.game?.isColorFree(color) ?? false;
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