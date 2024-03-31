import type { ServerWebSocket } from "bun";
import type { WsData } from "./wsData";

class Client {
    public ws: ServerWebSocket<WsData>;

    public get roomId() {
        return (this.ws.data as WsData).roomId;
    }

    constructor(ws: ServerWebSocket<WsData>) {
        this.ws = ws;
    }

    public disconnect() {
        this.ws.close(1000);
    }
}

export { Client };