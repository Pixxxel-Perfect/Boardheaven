import { ServerWebSocket } from "bun";

class WsData {
    public roomId: string = "";

    constructor(roomId: string) {
        this.roomId = roomId;
    }
}

class Player {
    public ws: ServerWebSocket<unknown>;

    constructor(ws: ServerWebSocket<WsData>) {
        this.ws = ws;
    }

    get roomId() {
        return (this.ws.data as WsData).roomId;
    }
}

class Room {
    public websockets: ServerWebSocket<unknown>[] = [];
    public gameMaster: Player;
    constructor(gameMaster: Player, websockets?: ServerWebSocket<unknown>[]) {
        this.gameMaster = gameMaster;
        if (websockets) {
            this.websockets = websockets;
        }
    }
}

const rooms: Room = [];

Bun.serve({
    fetch(req: Request): Response | Promise<Response> {
        if (this.upgrade(req, {data: new WsData(req.url)})) {
            console.log("WebSocket established.");
            return new Response("WebSocket established.");
        }
      return new Response("Connect via WebSocket please.");
    },
    websocket: {
        open(ws) {
            //TODO
        },
        message(ws, message) {
            console.log(message);
            ws.send(message);
        },
    }
});