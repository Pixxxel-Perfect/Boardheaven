import { Room, RoomStatus } from "./lib/room";
import { WsData } from "./lib/wsData";
import { Player } from "./lib/player";
import { GameCodeValidator } from "./lib/codesApi";
import { Client, Color } from "./lib/client";
import { WsMessage, WsMessageType } from "./lib/wsMessage";
import { Game } from "./lib/game";
import { ServerWebSocket } from "bun";
import { MinGamePiece } from "./lib/min/minGamePiece";

const codeAPI = new GameCodeValidator();

//URL = ws:[IP]/<ID>
//[FIX], <Optional>

Bun.serve<WsData>({
    async fetch(req: Request) {

        //TODO Game Code Validation
        //TODO add Client/WS Timeout

        const reqUrl = new URL(req.url);
        const roomId = reqUrl.pathname.slice(1);

        if (!Room.PATTERN_REGEX.test(roomId)) {
            console.log("rejected connection");
            return new Response("Invalid Room-ID", {
                status: 400
            });
        }

        if (this.upgrade(req, {data: new WsData(roomId)})) {
            return new Response("Could not upgrade connection.", {
                status: 426
            });
        }

        return new Response(Bun.file("index.html"), {
            status: 400
        });
    },
    websocket: {
        open(ws) {
            const roomId = ws.data.roomId;
            
            let room;
            if (room = Room.getRoom(roomId)) {

                room.addClient(new Client(ws));
                room.broadcastRoomStatus();

                return;
            }

            room = new Room(new Player(ws));
            room.roomStatus = RoomStatus.LOBBY;
            room.broadcastRoomStatus();

            ws.data.roomId = room.roomId;

            Room.ROOMS.push(room);
        },
        message(ws, message) {

            //TODO: handle incoming messages
            //TODO: send Error messages on error

            if (Buffer.isBuffer(message)) return;

            console.log(message);
            let parsedMessage;
            try {
                const preParsedMessage = JSON.parse(message);
                parsedMessage = preParsedMessage as WsMessage<unknown>;
            } catch {
                console.log("could not parse message");
                return;
            }


            const room = Room.getRoom(ws.data.roomId);
            if (!room) return ws.close();

            let client = room.getClient(ws);
            if (!client) return ws.close();

            switch (parsedMessage.messageType) {
                case WsMessageType.START_GAME:
                    if (!room.roomMaster.equals(client)) break;
                    room.game = new Game(Player.fromClients(room.clients));
                    room.game.startGame();

                    room.broadcastGameStatus();
                    break;
                case WsMessageType.CHOOSE_COLOR:
                    
                    let color;
                    try {
                        color = parsedMessage.value as Color;
                    } catch {
                        break;
                    }
                    if (!room.isColorFree(color)) break;

                    client.color = color;

                    room.broadcastRoomStatus();
                    break;
                case WsMessageType.TURN_ACTION:
                    if (!room.game) break;

                    let piece;
                    try {
                        piece = parsedMessage.value as MinGamePiece;
                    } catch {
                        break;
                    }
                    if (!(client.ws.remoteAddress == piece.owner.address)) break;
                    room.game.nextGameState(piece);

                    room.broadcastGameStatus();
                    break;
                case WsMessageType.CLOSE:
                    ws.send(JSON.stringify(new WsMessage(WsMessageType.CLOSE, null)));
                    ws.close();
                    break;
                case WsMessageType.ERROR:
                    break;
                default:
                    client.send(new WsMessage<string>(WsMessageType.ERROR, "The sent WsMessageType is unknown to the Server."));
            }

            //TODO find solution to this VVV (sort of done already)
            //room.broadcastRoomStatus();

        },
        close(ws) {
            const room = Room.ROOMS.find(r => r.roomId == ws.data.roomId);
            if (!room) return;

            removeWsFromRoom(room, ws);
        }
    }
});

function removeWsFromRoom(room: Room, ws: ServerWebSocket<WsData>): void {
    room.removeClientViaServerWebsocket(ws);
    room.broadcastRoomStatus();
}