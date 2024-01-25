import { Player } from "./player";

class GamePiece {
    
    public static of(piece: GamePiece): GamePiece {
        return new GamePiece(piece.owner, piece.homePos, piece.firstPos);
    }
    
    public pos: number;
    
    constructor(public owner: Player, public homePos: number, public firstPos: number) {
        this.pos = homePos;
    }

    get color() {
        return this.owner.color;
    }

    public capture() {
        this.pos = this.homePos;
    }
    
}

export { GamePiece };