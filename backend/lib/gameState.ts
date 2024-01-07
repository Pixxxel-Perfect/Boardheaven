import { Player, PlayerColor } from "./player"
import { GamePiece } from "./gamePiece";

class GameState {
    public pieces: GamePiece[];
    public players: Player[];
    public playingPlayer: Player;
    public diceRoll: number;

    constructor(players: Player[], playingPlayer: Player, pieces: GamePiece[]) {
        this.players = players;
        this.pieces = pieces;
        this.playingPlayer = playingPlayer;
        this.diceRoll = this.rollDice();
    }

    public rollDice(): number {
        return Math.floor(Math.random() * 6) + 1;
    }

    public getPieceFromPosition(pos: number, color: PlayerColor): GamePiece | null {
        return this.pieces.find(p => p.color == color && p.pos == pos) ?? null;
    }

    public capturePiece(pieceIndex: number) {
        const piece = this.pieces[pieceIndex];
        let newPos = -1;

        //very unsafe but f*ck it.
        while (this.getPieceFromPosition(newPos, piece.color)) {
            newPos--;
        }

        piece.pos = newPos;
    }
}

//Fluent API maybe here VVV
function calcNextState(gameState: GameState, pieceIndex: number): GameState | null {

    const piece = gameState.pieces[pieceIndex];

    let newPiecePosition;

    if (piece.pos < 0) {
        if (gameState.diceRoll == 6) {
            newPiecePosition = 1;
        }else {
            return null;
        }
    }else {
        newPiecePosition = piece.pos + gameState.diceRoll;
        if (newPiecePosition > 44) {
            return null;
        }
    }

    // newPiecePosition is now on the board. 

    // Collision Check

    let colPiece = gameState.getPieceFromPosition(newPiecePosition, piece.color);

    if (colPiece) {
        return null;
    }
    
    if (newPiecePosition > 0 && newPiecePosition <= 40) {
        //Only test other colors if part of shared board
        
        for (let i = 1; i <= 3; i++) {
            const translatedPos = translatePos(newPiecePosition, piece.color, i);
            colPiece = gameState.getPieceFromPosition(translatedPos, piece.color);
            
            if (colPiece) {
                gameState.capturePiece(gameState.pieces.indexOf(colPiece));
            }
        }
    }
    
    //Set new Position and return the GameState
    piece.pos = newPiecePosition;
    return gameState;
}

function translatePos(pos: number, colorFrom: PlayerColor, colorTo: PlayerColor | number): number {
    return pos + 10 * (colorFrom - colorTo);
}