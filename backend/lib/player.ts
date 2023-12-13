import { ServerWebSocket } from "bun";
import { WsData } from "./ws-data";

enum PlayerColor {
    //TODO rework colors
    RED,
    BLUE,
    YELLOW,
    GREEN
}

class Player {
    public ws: ServerWebSocket<unknown>;
    public color: PlayerColor | null = null;

    constructor(ws: ServerWebSocket<unknown>) {
        this.ws = ws;
    }

    get roomId() {
        return (this.ws.data as WsData).roomId;
    }
}

export { Player };