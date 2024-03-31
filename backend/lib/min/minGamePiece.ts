import { Color } from "../client";
import { GamePiece } from "../gamePiece";
import { MinPlayer } from "./minPlayer";

class MinGamePiece {
    public owner: MinPlayer;
    public homePos: number;
    public pos: number;
    public color: Color;
    public initPos: number;

    constructor(origin: GamePiece) {
        this.owner = new MinPlayer(origin.owner);
        this.homePos = origin.homePos;
        this.pos = origin.pos;
        this.color = origin.color;
        this.initPos = origin.initPos;
    }
}

export { MinGamePiece };