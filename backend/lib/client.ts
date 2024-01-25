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

    disconnect() {
        this.ws.close(1000);
    }
}

export { Client };