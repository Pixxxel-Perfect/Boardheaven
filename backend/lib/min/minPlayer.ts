import { Player } from "../player";
import { MinClient } from "./minClient";

class MinPlayer extends MinClient {
    public isSpectator: boolean = false;
    
    constructor(origin: Player) {
        super(origin);
        this.isSpectator = origin.isSpectator;
    }
}

export { MinPlayer }