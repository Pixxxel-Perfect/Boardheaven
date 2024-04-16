import { Color } from "./client";

class GamePiece {
    /**
     * Creates a shallow copy of a GamePiece
     * @param {GamePiece} piece the piece which will be copied
     */
    public static from(piece: GamePiece): GamePiece {
        return new GamePiece(piece.color, piece.homePos);
    }
    
    public pos: number;

    public get initPos() {
        return this.color * 10;
    }
    
    constructor(public color: Color, public homePos: number) {
        this.pos = homePos;
    }

    public equals(piece: GamePiece): boolean {
        if (piece.color !== this.color) return false;
        if (piece.pos !== this.pos) return false;
        if (piece.homePos !== this.homePos) return false;
        
        return true;
    }

    public capture() {
        this.pos = this.homePos;
    }
    
    public init() {
        this.pos = this.initPos;
    }
}

export { GamePiece };