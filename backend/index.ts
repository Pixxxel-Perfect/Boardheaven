import { Room, RoomStatus } from "./lib/room";
import { WsData } from "./lib/wsData";
import { Player, PlayerColor } from "./lib/player";
import { WsMessage, WsMessageType } from "./lib/wsMessage";
import { GameState } from "./lib/gameState";
import { GameCodeValidator } from "./lib/codesApi";
import { RequestBody, RequestType } from "./lib/reqBody";

const rooms: Room[] = [];
const codeAPI = new GameCodeValidator();

//URL = ws:[IP]/<ID>
//[FIX], <Optional>

Bun.serve<WsData>({
    async fetch(req: Request): Promise<Response> {
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
        const reqBody = await Bun.readableStreamToJSON(req.body ?? new ReadableStream()) as RequestBody;

        switch(reqBody.reqType) {
            case RequestType.CREATE_ROOM:
                //TODO
                break;
            case RequestType.JOIN_ROOM:
                //TODO
                break;
            case RequestType.REJOIN_ROOM:
                //TODO
                break;
        }

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
            const roomId = ws.data.roomId;
            
            
            let room;
            if (room = getRoom(roomId)) {
                room.addPlayer(new Player(ws));

                ws.sendText(JSON.stringify(new WsMessage(WsMessageType.INFO, roomId)));
                
                
                return;
            }

            //TODO: message client that they created a new room
            room = new Room(new Player(ws), roomId);
            rooms.push(room);
            room.roomStatus = RoomStatus.LOBBY;

            //DEBUG comment-outing
            ws.sendText(JSON.stringify(new WsMessage(WsMessageType.INFO, room.roomId)));
            
            //console.log(rooms);
            
        },
        message(ws, message) {
            /*console.log("'" + message + "' was sent from " + ws.remoteAddress);
            getRoom(ws.data.roomId)?.broadcast(JSON.stringify({sender: ws.remoteAddress, message: message}));*/

            //TODO: handle incoming messages

            if (Buffer.isBuffer(message)) return;
            let parsedMessage: WsMessage;
            try {
                parsedMessage = JSON.parse(message) as WsMessage;
            } catch {
                return;
            }

            let room = getRoom(ws.data.roomId);
            if (!room) return ws.close();

            let player = room?.getPlayer(ws);
            if (!player) return;

            switch (parsedMessage.type) {
                case WsMessageType.START_GAME:
                    if (room.gameMaster.ws != ws) return;
                    if (room.roomStatus != RoomStatus.LOBBY) return;

                    let allHaveColor = true;
                    room.players.forEach(p => {
                        if (p.color == PlayerColor.NOT_SET) allHaveColor = false;
                    });
                    if (!allHaveColor) return;

                    room.gameState = new GameState(room.players, room.gameMaster);
                    room.roomStatus = RoomStatus.PLAYING;
                    break;
                case WsMessageType.SET_COLOR:
                    if (room.roomStatus != RoomStatus.LOBBY) return;
                    try {
                        player.color = toNumber(parsedMessage.value);
                        if (player.color < -1 || player.color > 3) player.color = PlayerColor.NOT_SET;
                    } catch {}
                    break;
                case WsMessageType.TURN_ACTION:
                    if (room.roomStatus != RoomStatus.PLAYING) return;
                    if (room.gameState?.playingPlayer != player) return;

                    //  TODO look over the fact, that you may not have to assign it
                    //  because the state already modifies itself.
                    let newGameState = room.gameState.calcNextState(toNumber(parsedMessage.value));

                    room.gameState = newGameState ?? room.gameState;
                case WsMessageType.TURN_SKIP:
                    // TODO Validate the possible skip
                    room.gameState?.nextPlayer();
                    break;
                //TODO other types
                
            }


        },
        close(ws) {
            /*rooms.forEach(r => {
                for (let i = 0; i < r.players.length; i++) {
                    const p = r.players[i];
                    if (p.ws.remoteAddress === ws.remoteAddress) {
                        r.removePlayer(p)
                    };
                }
            });*/

            const room = rooms.find(r => r.roomId == ws.data.roomId);
            //TODO better VVV
            const player = room?.players.find(p => p.ws.remoteAddress == ws.remoteAddress);

            room?.removePlayer(player);
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