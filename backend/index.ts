import { Room, RoomStatus } from "./lib/room";
import { WsData } from "./lib/wsData";
import { GameCodeValidator } from "./lib/codesApi";
import { Client, Color } from "./lib/client";
import { WsMessage, WsMessageType } from "./lib/wsMessage";
import { ServerWebSocket } from "bun";
import { MinGamePiece } from "./lib/min/minGamePiece";

const codesAPI = new GameCodeValidator();

//URL = ws:[IP]/<ID>
//[FIX], <Optional>

Bun.serve<WsData>({
    async fetch(req: Request) {

        //TODO Game Code Validation
        //TODO add Client/WS Timeout

        const reqUrl = new URL(req.url);
        const pathnameSlices = reqUrl.pathname.split("/");
        const roomId = pathnameSlices[1];
        const gameCode = pathnameSlices[2];

        if (!Room.PATTERN_REGEX.test(roomId)) {
            console.log("rejected connection");
            return new Response("Invalid Room-ID", {
                status: 400
            });
        }

        if (this.upgrade(req, {data: new WsData(roomId, gameCode ?? null)})) {
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
            const client = new Client(ws);
            const wsData = ws.data;
            
            let room;
            if (room = Room.getRoom(wsData.roomId)) {

                room.addClient(client);
                room.broadcastRoomStatus();

                return;
            }


            if (!codesAPI.isValid(wsData.gameCode)) {
                client.send(new WsMessage(WsMessageType.ERROR, "The given Game Code is invalid."));
                client.disconnect();
                return;
            }

            room = new Room(new Client(ws));
            room.roomStatus = RoomStatus.LOBBY;
            room.broadcastRoomStatus();

            wsData.roomId = room.roomId;

            Room.ROOMS.push(room);
        },
        message(ws, message) {
            if (Buffer.isBuffer(message)) return;

            let parsedMessage;
            try {
                const preParsedMessage = JSON.parse(message);
                parsedMessage = preParsedMessage as WsMessage<unknown>;
            } catch {
                console.log("could not parse message");
                return;
            }


            const room = Room.getRoom(ws.data.roomId);
            if (!room) {
                const client = new Client(ws);
                client.disconnect();
                return;
            }

            let client = room.getClient(ws);
            if (!client) {
                const client = new Client(ws);
                client.disconnect();
                return;
            }

            switch (parsedMessage.messageType) {
                case WsMessageType.START_GAME:
                    if (!room.roomMaster.equals(client)) break;
                    room.sortClientsByColor();
                    room.startGame();

                    room.roomStatus = RoomStatus.PLAYING;
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
                    if (!room.currentGameState) break;

                    let piece;
                    try {
                        piece = parsedMessage.value as MinGamePiece;
                    } catch {
                        break;
                    }

                    if (client.color !== room.currentGameState.currentPlayerColor) break;

                    if (room.updateGameState(piece)) room.broadcastGameStatus();
                    break;
                case WsMessageType.CLOSE:
                    break;
                case WsMessageType.ERROR:
                    console.log(`The following error was encountered with ${client.ws.remoteAddress}: ${parsedMessage.value}`);
                    break;
                default:
                    client.send(new WsMessage<string>(WsMessageType.ERROR, "The sent WsMessageType is unknown to the Server."));
            }
        },
        close(ws) {
            const room = Room.ROOMS.find(r => r.roomId == ws.data.roomId);
            if (!room) return;

            removeWsFromRoom(room, ws);
        }
    }
});

function removeWsFromRoom(room: Room, ws: ServerWebSocket<WsData>): void {
    room.removeClient(ws);
    if (room.currentGameState) {
        room.broadcastGameStatus();
        return;
    }
    room.broadcastRoomStatus();
}