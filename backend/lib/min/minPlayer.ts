import { MinClient } from "./minClient";

class MinPlayer extends MinClient {
    constructor(public address: string, public color: number, public isSpectator: boolean) {
        super(address, color);
    }
}

export { MinPlayer }