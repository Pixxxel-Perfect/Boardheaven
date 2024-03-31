import { Room, RoomStatus } from "../room";
import { MinClient } from "./minClient";


class MinRoom {
    constructor(
        public roomId: string,
        public roomStatus: RoomStatus,
        public clients: MinClient[],
        public roomMaster: MinClient
        ) {}
}

export { MinRoom };