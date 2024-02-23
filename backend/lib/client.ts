import { ServerWebSocket } from "bun";
import { WsData } from "./wsData";
import { totalCompileTime } from "bun:jsc";

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

    public equals(client: Client | ServerWebSocket<WsData>) {
        if (client instanceof Client) return client.ws.remoteAddress == this.ws.remoteAddress;
        return client.remoteAddress == this.ws.remoteAddress;
    }
}

export { Client };