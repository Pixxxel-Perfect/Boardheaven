import { Player } from "./player";

class GamePiece {
    public owner: Player;
    public pos: number;

    constructor(owner: Player, pos: number) {
        this.owner = owner;
        this.pos = pos;
    }
}

export { GamePiece };