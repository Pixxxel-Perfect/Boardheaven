import { ServerWebSocket } from "bun";
import { Player } from "./player";
import { getTokenSourceMapRange } from "typescript";

enum RoomStatus {
    INIT,
    LOBBY,
    PLAYING,
    REJOIN,
    END,
    CLOSING
}

class Room {
    public static readonly PLAYER_LIMIT = 4;

    public players: Player[];
    public gameMaster: Player;
    public roomId: string;
    public roomStatus: RoomStatus = RoomStatus.INIT;

    constructor(gameMaster: Player, roomId?: string) {
        //this.gameMaster = (players && players.length > 0) ? players[0] : null;
        this.gameMaster = gameMaster;
        this.players = [gameMaster];
        this.roomId = (roomId) ? roomId : this.generateId();
    }

    //Length: 8
    private generateId(): string {
        const idPattern = "abcdefghijklmnopqrstuvwxyz0123456789";
        let id = "";
        
        for (let i = 0; i < 8; i++) {
            id += idPattern.charAt(Math.random() * idPattern.length);
        }
        
        return id;
    }

    public addPlayer(player: Player): Boolean {
        if (this.players.length >= Room.PLAYER_LIMIT) {
            return false;
        }
        
        if (this.players.includes(player)) {
            return false;
        }

        this.players.push(player);

        return true;
    }

    public removePlayer(player: Player): Boolean {
        let index = this.players.indexOf(player);
        if (index == -1) {
            return false;
        }

        this.players.splice(index, 1);
        
        return true;
    }

    public broadcast(message: string | Buffer) {
        this.players.forEach(p => p.ws.send(message));
    }
}

export { Room, RoomStatus };