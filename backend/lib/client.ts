import { ServerWebSocket } from "bun";
import { WsData } from "./wsData";

class Client {
    public ws: ServerWebSocket<WsData>;

    constructor(ws: ServerWebSocket<WsData>) {
        this.ws = ws;
    }

    get roomId() {
        return (this.ws.data as WsData).roomId;
    }
}

export { Client };