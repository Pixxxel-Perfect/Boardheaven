import { ServerWebSocket } from "bun";
import { Player } from "./player";

class Room {
    public websockets: ServerWebSocket<unknown>[] = [];
    public gameMaster: Player;
    constructor(gameMaster: Player, websockets?: ServerWebSocket<unknown>[]) {
        this.gameMaster = gameMaster;
        if (websockets) {
            this.websockets = websockets;
        }
    }
}

export { Room };