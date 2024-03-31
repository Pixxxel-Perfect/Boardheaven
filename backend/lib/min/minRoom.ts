import { Room, RoomStatus } from "../room";
import { MinClient } from "./minClient";


class MinRoom {
    public roomId: string;
    public roomStatus: RoomStatus = RoomStatus.LOBBY;
    public clients: MinClient[] = []
    public roomMaster: MinClient;

    constructor(origin: Room) {
        //Maybe even remove this VVV
        this.roomId = origin.roomId;
        //Maybe even remove this ^^^
        this.roomStatus = origin.roomStatus;
        origin.clients.forEach(c => this.clients.push(new MinClient(c)));
        this.roomMaster = new MinClient(origin.roomMaster);
    }

}

export { MinRoom };