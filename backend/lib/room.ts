import { ServerWebSocket } from "bun";
import { Client } from "./client";
import { Game } from "./game";
import { WsMessage } from "./wsMessage";
import { WsData } from "./wsData";

enum RoomStatus {
    LOBBY,
    PLAYING,
}

class Room {
    public static readonly ID_PATTERN = "abcdefghijklmnopqrstuvwxyz0123456789";
    public static readonly DEFAULT_LENGTH = 8;
    
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

    public broadcast(wsMessage: WsMessage<unknown>) {
        this.clients.forEach(p => p.ws.send(JSON.stringify(wsMessage)));
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

        //TODO handle roommaster

        if (!this.clients.find(c => c.equals(this.roomMaster))) {
            this.roomMaster
        }
    }

    //TODO handle player disconnecting

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