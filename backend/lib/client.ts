import { ServerWebSocket } from "bun";
import { WsData } from "./wsData";
import { WsMessage } from "./wsMessage";

enum Color {
    NOT_SET = -1,
    BLACK = 0,
    YELLOW = 1,
    GREEN = 2,
    RED = 3
}

class Client {
    public ws: ServerWebSocket<WsData>;
    public color: Color = Color.NOT_SET;

    public get roomId() {
        return (this.ws.data as WsData).roomId;
    }

    constructor(ws: ServerWebSocket<WsData>) {
        this.ws = ws;
    }

    public send(message: WsMessage<unknown>) {
        this.ws.send(JSON.stringify(message));
    }

    public disconnect() {
        this.ws.close(1000);
    }

    public equals(client: Client | ServerWebSocket<WsData>) {
        if (client instanceof Client) return client.ws.remoteAddress == this.ws.remoteAddress;
        return client.remoteAddress == this.ws.remoteAddress;
    }
}

export { Client, Color };