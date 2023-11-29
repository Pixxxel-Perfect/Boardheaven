import { Room } from "./lib/room";
import { WsData } from "./lib/ws-data";

const rooms: Room[] = [];

Bun.serve({
    fetch(req: Request): Response | Promise<Response> {

        /*
        TODO:
            spit request between
                1. Simple first website visit
                2. making a room
                3. joining a room
                4. rejoining a room
            
            Add Logic for all cases and then:
                - Error Detection
                - Error Handling
                    Client Side (Send messages)
                    Server Side (Log Errors)
        */

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