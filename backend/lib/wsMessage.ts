import { ServerWebSocket } from "bun";
import { WsData } from "./ws-data";

enum MessageType {
    SET_COLOR,
    START_GAME,
    TURN_ACTION,
    REJOIN_ACTION,
}

class WsMessage {
    public owner: ServerWebSocket<WsData>;
    public value: string;

    public constructor(owner: ServerWebSocket<WsData>, value?: string) {
        this.owner = owner;
        this.value = value ?? "1";
    }
}