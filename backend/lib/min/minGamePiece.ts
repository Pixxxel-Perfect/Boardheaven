import { MinColor } from "./minColor";
import { MinPlayer } from "./minPlayer";

class MinGamePiece {
    constructor(
    public owner: MinPlayer,
    public homePos: number,
    public pos: number,
    public color: MinColor,
    public initPos: number
    ) {}
}

export { MinGamePiece };