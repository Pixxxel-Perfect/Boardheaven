import { Player, PlayerColor } from "./player"
import { GamePiece } from "./gamePiece";

class GameState {
    public pieces: GamePiece[] = [];
    public activePlayers: Player[] = [];
    public finishedPlayers: Player[] = [];
    public playingPlayer: Player;
    public diceRoll: number;

    constructor(players: Player[], playingPlayer: Player) {
        
        players.forEach(p => {
            if (p.color <= 0) return;
            
            this.activePlayers.push(p);
            
            for (let i = 0; i < 4; i++) {
                this.pieces.push(new GamePiece(p, -(p.color * 10 + i)));
            }
        });

        this.playingPlayer = (playingPlayer.color > 0) ? playingPlayer : this.activePlayers[0];
        this.diceRoll = this.rollDice();
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
        
        this.checkWin();

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

        const playerIndex = this.activePlayers.indexOf(this.playingPlayer);

        if (this.finishedPlayers.includes(this.playingPlayer)) this.removeFromArray(this.activePlayers, this.playingPlayer);
        
        this.playingPlayer = this.activePlayers[(playerIndex + 1) % this.activePlayers.length];
    }

    public checkWin() {
        let housePieces = this.pieces.filter(gp => gp.color == this.playingPlayer.color && gp.pos > 40);
        if (housePieces.length !== 3) return;

        this.activePlayers.push(this.playingPlayer);

        if (this.activePlayers.length == 1) this.finish();
    }

    public finish() {
        //TODO
    }

    public removeFromArray<T>(array: Array<T>, element: T): Array<T> {
        let index = array.indexOf(element);
        
        if (index < 0) return array;
        
        let firstJoinArray = array.slice(0, index);
        let secondJoinArray = array.slice(index + 1);

        return firstJoinArray.concat(secondJoinArray);
    }
}



export { GameState };