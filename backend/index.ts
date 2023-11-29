import { Room } from "./lib/room";
import { WsData } from "./lib/ws-data";

const rooms: Room[] = [];

//URL = ws:[IP]/<ID>
//[FIX], <Optional>

Bun.serve({
    fetch(req: Request): Response | Promise<Response> {

        /*
        TODO:
            spit request between
                - making a room
                - joining a room
                - rejoining a room
            
            Add Logic for all cases and then:
                - Error Detection
                - Error Handling
                    Client Side (Send messages)
                    Server Side (Log Errors)
        */

        const reqUrl = new URL(req.url);
        if (reqUrl.pathname.length < 2) {
            //Make new Room and assign the websocket the new room somehow
        }

        if (!this.upgrade(req, {data: new WsData(req.url)})) {
            return new Response(null, {
                status: 426,
                statusText: "Could not upgrade connection."
            });
        }
        
        
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