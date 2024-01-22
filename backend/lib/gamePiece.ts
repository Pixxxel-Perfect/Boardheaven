import { Player } from "./player";

class GamePiece {
    public owner: Player;
    public pos: number;
    public homePos: number;

    constructor(owner: Player, homePos: number) {
        this.owner = owner;
        this.homePos = homePos;
        this.pos = homePos;
    }

    get color() {
        return this.owner.color;
    }

    capture() {
        this.pos = this.homePos;
    }
}

export { GamePiece };