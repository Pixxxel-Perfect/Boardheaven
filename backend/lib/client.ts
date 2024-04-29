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
    public color: Color = Color.NOT_SET;
    public isSpectator: boolean = false;

    public get roomId() {
        return this.ws.data.roomId;
    }

    constructor(public ws: ServerWebSocket<WsData>) {}

    public send(message: WsMessage<unknown>) {
        this.ws.send(JSON.stringify(message));
    }

    public disconnect() {
        this.send(new WsMessage(WsMessageType.CLOSE, null));
        this.ws.close(1000);
    }

    public equals(client: Client | ServerWebSocket<WsData>) {
        if (client instanceof Client) client = client.ws;
        return client === this.ws;
    }

    public finishGame(winningColor: Color) {
        this.send(new WsMessage(WsMessageType.GAME_FINISH, winningColor));
    }

    public ownsPiece(piece: GamePiece): boolean {
        return this.color == piece.color;
    }
}

export { Client, Color };