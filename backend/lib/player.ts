import { ServerWebSocket } from "bun";
import { WsData } from "./ws-data";

enum PlayerColor {
    NOT_SET = -1,
    BLACK = 0,
    YELLOW = 1,
    GREEN = 2,
    RED = 3
}

class Player {
    public ws: ServerWebSocket<WsData>;
    public color: PlayerColor = PlayerColor.NOT_SET;

    constructor(ws: ServerWebSocket<WsData>) {
        this.ws = ws;
    }

    get roomId() {
        return (this.ws.data as WsData).roomId;
    }
}

export { Player, PlayerColor };