import { ServerWebSocket } from "bun";
import { WsData } from "./ws-data";

class Player {
    public ws: ServerWebSocket<unknown>;

    constructor(ws: ServerWebSocket<WsData>) {
        this.ws = ws;
    }

    get roomId() {
        return (this.ws.data as WsData).roomId;
    }
}

export { Player };