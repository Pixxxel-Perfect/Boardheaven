enum WsMessageType {
    SET_COLOR,
    START_GAME,
    TURN_ACTION,
    TURN_SKIP,
    REJOIN_ACTION,
    END_GAME,
    INFO,
}

class WsMessage {
    public type: WsMessageType;
    public value: number | string;

    public constructor(type: WsMessageType, value?: number | string) {
        this.type = type;
        this.value = value ?? 0;
    }
}

export { WsMessage, WsMessageType };