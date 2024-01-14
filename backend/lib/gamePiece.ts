import { Player } from "./player";

class GamePiece {
    public owner: Player;
    public pos: number;
    public homePos: number;

    constructor(owner: Player, pos: number) {
        this.owner = owner;
        this.homePos = pos;
        this.pos = pos;
    }

    get color() {
        return this.owner.color;
    }

    capture() {
        this.pos = this.homePos;
    }
}

export { GamePiece };