import { MinClient } from "./minClient";

enum MinRoomStatus {
    LOBBY,
    PLAYING,
}

class MinRoom {
    constructor(
        public roomId: string,
        public roomStatus: MinRoomStatus,
        public clients: MinClient[],
        public roomMaster: MinClient
        ) {}
}

export { MinRoom, MinRoomStatus };