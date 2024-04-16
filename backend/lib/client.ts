import { ServerWebSocket } from "bun";
import { WsData } from "./wsData";
import { WsMessage, WsMessageType } from "./wsMessage";
import { GamePiece } from "./gamePiece";

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
    public isSpectator: boolean = false;

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
        if (client instanceof Client) client = client.ws;
        return client == this.ws;
    }

    public finishGame(winningColor: Color) {
        // I am throwing out everyone after a game
        // TODO That can/will be changed later to allow multiple games in succession
        this.send(new WsMessage(WsMessageType.GAME_FINISH, winningColor));
        this.disconnect();
    }

    public ownsPiece(piece: GamePiece): boolean {
        return this.color == piece.color;
    }
}

export { Client, Color };