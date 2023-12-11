import { isReadonlyKeywordOrPlusOrMinusToken } from "typescript";
import { Room, RoomStatus } from "./lib/room";
import { WsData } from "./lib/ws-data";
import { Player } from "./lib/player";

const rooms: Room[] = [];

//URL = ws:[IP]/<ID>
//[FIX], <Optional>

Bun.serve({
    fetch(req: Request): Response | Promise<Response> {

        /*
        TODO:
            Spit request between
                - making a room [x]
                - joining a room [x]
                - rejoining a room
            
            Add Logic for all cases and then:
                - Error Detection
                - Error Handling

            Add Documentation for lib Classes
        */

        const reqUrl = new URL(req.url);

        if (!this.upgrade(req, {data: new WsData(reqUrl.pathname.slice(1))})) {
            return new Response(null, {
                status: 426,
                statusText: "Could not upgrade connection."
            });
        }
        
        
    },
    websocket: {
        open(ws) {
            const roomId = (ws.data as WsData).roomId;

            if (roomId.length > 0) {
                const room = new Room(new Player(ws));
                room.roomStatus = RoomStatus.LOBBY;
                rooms.push(room);
                return;
            }

            const room = rooms.find(r => r.roomId == roomId);

            if (room?.addPlayer(new Player(ws))) {
                room.roomStatus = RoomStatus.LOBBY;
            }
            
        },
        message(ws, message) {
            console.log(message);
            ws.send(message);
        },
    }
});