import { Room, RoomStatus } from "./lib/room";
import { WsData } from "./lib/wsData";
import { Player, PlayerColor } from "./lib/player";
import { GameState } from "./lib/gameState";
import { GameCodeValidator } from "./lib/codesApi";
import { Client } from "./lib/client";
import { WsMessage, WsMessageType } from "./lib/wsMessage";

const rooms: Room[] = [];
const codeAPI = new GameCodeValidator();

//URL = ws:[IP]/<ID>
//[FIX], <Optional>

Bun.serve<WsData>({
    async fetch(req: Request): Promise<Response> {

        const reqUrl = new URL(req.url);
        if (!this.upgrade(req, {data: new WsData(reqUrl.pathname.slice(1))})) {
            return new Response(null, {
                status: 426,
                statusText: "Could not upgrade connection."
            });
        }

        // TODO change to room message
        return new Response("Connection established.");
        
    },
    websocket: {
        open(ws) {
            const roomId = ws.data.roomId;
            
            let room;
            if (room = getRoom(roomId)) {

                room.addClient(new Client(ws));
                room.broadcast(new WsMessage<Room>(WsMessageType.ROOM_STATUS, room));

                return;
            }

            room = new Room(new Player(ws), roomId);
            room.roomStatus = RoomStatus.LOBBY;
            room.broadcast(new WsMessage(WsMessageType.ROOM_STATUS, room));

            rooms.push(room);
        },
        message(ws, message) {
            /*console.log("'" + message + "' was sent from " + ws.remoteAddress);
            getRoom(ws.data.roomId)?.broadcast(JSON.stringify({sender: ws.remoteAddress, message: message}));*/

            //TODO: handle incoming messages

            if (Buffer.isBuffer(message)) return;

            const preParsedMessage = JSON.parse(message);
            let parsedMessage;
            try {
                parsedMessage = preParsedMessage as WsMessage<unknown>;
            } catch {
                return;
            }

            let room = getRoom(ws.data.roomId);
            if (!room) return ws.close();

            let client = room.getClient(ws);
            if (!client) return ws.close();

            //TODO switch for the message type
            //DEBUG
            room.broadcast(preParsedMessage);
            //DEBUG


        },
        close(ws) {
            const room = rooms.find(r => r.roomId == ws.data.roomId);
            if (!room) return;
            //TODO better VVV
            const client = room.clients.find(c => c.ws.remoteAddress == ws.remoteAddress);
            if (!client) return;

            room.removeClient(client);
        }
    }
});

function getRoom(roomId: string): Room | null {
    return rooms.find(r => r.roomId == roomId) ?? null;
}

function toNumber(text: string | number): number {
    try {
        return Math.floor(parseInt(text + ""));
    } catch {
        return 0;
    }
}