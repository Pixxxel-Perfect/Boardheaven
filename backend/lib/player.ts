import { ServerWebSocket } from "bun";
import { WsData } from "./wsData";
import { Client } from "./client";
import { WsMessage, WsMessageType } from "./wsMessage";

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
    public isSpectator: boolean = false;
    
    public constructor(ws: ServerWebSocket<WsData>) {
        super(ws);
    }

    public finishGame() {
        this.send(new WsMessage(WsMessageType.GAME_FINISH, null));
        this.disconnect();
    }
}

export { Player, PlayerColor };