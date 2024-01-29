import { Player } from "./player";

class GamePiece {
    
    public static of(piece: GamePiece): GamePiece {
        return new GamePiece(piece.owner, piece.homePos);
    }
    
    public pos: number;

    public get color() {
        return this.owner.color;
    }

    public get initPos() {
        return this.color * 10 + 1;
    }
    
    constructor(public owner: Player, public homePos: number) {
        this.pos = homePos;
    }

    public capture() {
        this.pos = this.homePos;
    }
    
    public init() {
        this.pos = this.initPos;
    }
}

export { GamePiece };