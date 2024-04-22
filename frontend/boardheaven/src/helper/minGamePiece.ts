import type { MinColor } from "./minClient";

class MinGamePiece {
    constructor(
    public homePos: number,
    public pos: number,
    public color: MinColor,
    public initPos: number
    ) {}
}

export { MinGamePiece };