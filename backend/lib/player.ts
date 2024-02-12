import { ServerWebSocket } from "bun";
import { WsData } from "./wsData";
import { Client } from "./client";

enum PlayerColor {
    NOT_SET = -1,
    BLACK = 0,
    YELLOW = 1,
    GREEN = 2,
    RED = 3
}

class Player extends Client {
    public static from(client: Client): Player {
        return new this(client.ws);
    }

    public color: PlayerColor = PlayerColor.NOT_SET;
    public active: boolean = true;
    
    constructor(ws: ServerWebSocket<WsData>) {
        super(ws);
    }
}

export { Player, PlayerColor };