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

            Test Websocket Code

            add Player choosing color

            Test Player Code
            
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

        return new Response("Connection established.");
        
    },
    websocket: {
        open(ws) {
            const roomId = (ws.data as WsData).roomId;
            
            const room = getRoom(roomId) ?? new Room(new Player(ws));

            room.addPlayer(new Player(ws));
            room.roomStatus = RoomStatus.LOBBY;
            
        },
        message(ws, message) {

            //

            console.log("'" + message + "' was sent from " + ws.remoteAddress);
            getRoom((ws.data as WsData).roomId)?.broadcast(message);
        },
        close(ws) {
            rooms.forEach(r => {
                for (let i = 0; i < r.players.length; i++) {
                    const p = r.players[i];
                    if (p.ws.remoteAddress === ws.remoteAddress) {
                        r.removePlayer(p)
                    };
                }
            });

            const room = rooms.find(r => r.roomId == (ws.data as WsData).roomId);
            const player = room?.players.find(p => p.ws.remoteAddress == ws.remoteAddress);

            room?.removePlayer(player);
        }
    }
});

function getRoom(roomId: string): Room | null {
    return rooms.find(r => r.roomId === roomId) ?? null;
}