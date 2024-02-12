import { Client } from "./client";
import { Game } from "./game";

enum RoomStatus {
    LOBBY,
    PLAYING,
}

class Room {
    public static idPattern = "abcdefghijklmnopqrstuvwxyz0123456789";
    
    public roomId: string;
    public clients: Client[] = []
    public roomMaster: Client;
    public game?: Game;

    constructor(roomMaster: Client, roomId?: string) {
        this.clients.push(roomMaster);
        this.roomMaster = roomMaster;
        this.roomId = roomId ?? this.generateId(8);
    }

    public broadcast(message: string | Buffer) {
        this.clients.forEach(p => p.ws.send(message));
    }

    private generateId(length: number): string {
        let id = "";
        
        for (let i = 0; i < 8; i++) {
            id += Room.idPattern.charAt(Math.floor(Math.random() * Room.idPattern.length));
        }
        
        return id;
    }
}

export { Room, RoomStatus };