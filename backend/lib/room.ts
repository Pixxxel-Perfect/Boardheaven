import { ServerWebSocket } from "bun";
import { Player } from "./player";

class Room {
    public players: Player[] = [];
    public gameMaster: Player | null;
    public roomId: string;

    constructor(players?: Player[]) {
        this.gameMaster = (players && players.length > 0) ? players[0] : null;
        this.players = (players) ? players : this.players;
        
        this.roomId = this.generateId();
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
}

export { Room };