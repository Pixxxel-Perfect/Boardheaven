import { Player, PlayerColor } from "./player"
import { GamePiece } from "./gamePiece";

class GameState {
    public pieces: GamePiece[] = [];
    public players: Player[];
    public playingPlayer: Player;
    public diceRoll: number;

    constructor(players: Player[], playingPlayer: Player) {
        this.players = players;
        this.playingPlayer = playingPlayer;

        this.diceRoll = this.rollDice();

        players.forEach(p => {
            for (let i = 0; i < 4; i++) {
                this.pieces.push(new GamePiece(p, -(p.color * 10 + i)));
            }
        });

    }

    public rollDice(): number {
        return Math.floor(Math.random() * 6) + 1;
    }

    public getPieceFromPosition(pos: number, color: PlayerColor): GamePiece | null {
        return this.pieces.find(p => p.color == color && p.pos == pos) ?? null;
    }

    public calcNextState(pieceIndex: number): this | null {

        const piece = this.pieces[pieceIndex];
    
        let newPiecePosition: number = 1;
    
        if (piece.pos < 0 && this.diceRoll != 6) return null;
        if ((newPiecePosition = piece.pos + this.diceRoll) > 44) return null;
        
        // newPiecePosition is now on the board. 
    
        // Collision Check
    
        let colPiece = this.getPieceFromPosition(newPiecePosition, piece.color);
    
        if (colPiece) return null;
        
        if (newPiecePosition > 0 && newPiecePosition <= 40) {
            //Only test other colors if part of shared board
            
            for (let i = 1; i <= 3; i++) {
                const translatedPos = this.translatePos(newPiecePosition, piece.color, i);
                colPiece = this.getPieceFromPosition(translatedPos, piece.color);
                
                if (colPiece) colPiece.capture();
            }
        }
        
        //TODO add win condition

        //Set new Position, switch playingPlayer and return 'this'
        piece.pos = newPiecePosition;

        //IF BUG, CLONE playingPlayer somehow
        const currentPlayer = this.playingPlayer;

        this.nextPlayer();
        if (currentPlayer == this.playingPlayer) this.finish();
        this.rollDice();
        return this;
    }
    
    public translatePos(pos: number, colorFrom: PlayerColor, colorTo: PlayerColor | number): number {
        return pos + 10 * (colorFrom - colorTo);
    }

    public nextPlayer() {
        if (this.diceRoll == 6) return;

        const playerIndex = this.players.indexOf(this.playingPlayer);
        this.playingPlayer = this.players[(playerIndex + 1) % this.players.length];
    }

    public finish() {
        
    }
}



export { GameState };