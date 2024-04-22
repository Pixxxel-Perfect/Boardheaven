enum WsMessageType {
    //SERVER
    ROOM_STATUS,
    GAME_STATUS,
    GAME_FINISH,
    //CLIENT
    START_GAME,
    CHOOSE_COLOR,
    TURN_ACTION,
    //BOTH
    ERROR,
    CLOSE,
}

class WsMessage<T> {
    public constructor(
        public messageType: WsMessageType,
        public value: T
    ) {}
}

export { WsMessage, WsMessageType };