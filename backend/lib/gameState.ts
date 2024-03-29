import { Color } from "./client";
import { Game } from "./game";
import { GamePiece } from "./gamePiece";
import { Player } from "./player";

class GameState {
    public pieces: GamePiece[] = [];
    public playingPlayerIndex = 0;
    public diceThrow: number;

    public get players(): Player[] {
        return this.game.players;
    }

    public get currentPlayer(): Player {
        return this.players[this.playingPlayerIndex];
    }

    constructor(public game: Game, pieces?: GamePiece[]) {
        this.diceThrow = Math.floor(Math.random() * 6) + 1;

        if (pieces) {
            pieces.forEach(p => this.pieces.push(GamePiece.from(p)));
            return;
        }
        
        this.players.filter(p => !p.isSpectator).forEach(p => {
            for (let i = 1; i <= 4; i++) {
                this.pieces.push(new GamePiece(p, -i * p.color));
            }
        });
    }

    public nextGameState(piece: GamePiece): GameState {
        if (piece.owner !== this.currentPlayer) return this;

        const newGameState = new GameState(this.game, this.pieces);

        if (newGameState.movePiece(piece)) return this;

        if (this.shouldEnd()) {
            this.game.finishGame();
            return this;
        }

        newGameState.switchToNextPlayer();
        return newGameState;
    }

    public equals(gameState: GameState): boolean {
        if (this.playingPlayerIndex !== gameState.playingPlayerIndex) return false;
        if (this.diceThrow !== gameState.diceThrow) return false;

        this.pieces.forEach(p => {
            gameState.pieces.forEach(gsp => {
                if (!p.equals(gsp)) return false;
            });
        });

        return true;
    }

    //Dude, I will have to optimize movePiece some day VVV

    // Position is a number ranging from -16 to -1 for the starting house
    // 0 to 39 for on the board
    // and add 100 for being in the end house
    public movePiece(piece: GamePiece): Boolean {
        if (piece.pos > 100) {
            let newPos = piece.pos + this.diceThrow;
            if (newPos % 10 > 3) return false;

            //Test if new position is valid
            if (this.getPieceAt(newPos)) return false;
            
            piece.pos = newPos;

            return true;
            
        }

        let newPos;
        // Test if piece can be initialized on the board
        if (piece.pos < 0) {
            if (this.diceThrow !== 6) return false;
            newPos = piece.color * 10;
        }else {

            newPos = (piece.pos + this.diceThrow) % 40;
            
            let housePos;
            switch (piece.color) {
                case Color.BLACK:
                    housePos = 39;
                    break;
                case Color.YELLOW:
                    housePos = 9;
                    break;
                case Color.GREEN:
                    housePos = 19;
                    break;
                case Color.RED:
                    housePos = 29;
                    break;
                default:
                    housePos = 1000;
            }

            if (piece.pos > housePos - this.diceThrow && piece.pos < housePos) {
                if (newPos % 10 > 3) {
                    return false;
                }
                newPos += 100;
            }
        }

        //Test if new position is valid
        let possColPiece = this.getPieceAt(newPos);
        if (possColPiece) {
            if (possColPiece.color == piece.color) return false;
            possColPiece.capture();
        }
        
        piece.pos = newPos;

        return true;
    }

    public switchToNextPlayer() {
        let index;
        // do-while is SUPER dangerous
        let failsafe = 0;
        do {
            if (failsafe > 4) break;
            index = (this.playingPlayerIndex + 1) % this.players.length;
        } while (this.isPlayerFinished(this.currentPlayer));
    }

    public isPlayerFinished(player: Player): boolean {
        if (player.isSpectator) return true;

        let pieces = this.getPiecesOfPlayer(player);
        return pieces.every(p => p.pos >= 100);
    }

    public shouldEnd(): boolean {
        return this.players.every(p => this.isPlayerFinished(p));
    }

    public getPieceAt(pos: number): GamePiece | null {
        return this.pieces.find(p => p.pos = pos) ?? null;
    }

    public getPiecesOfPlayer(player: Player): GamePiece[] {
        return this.pieces.filter(p => p.owner == player);
    }
}

export { GameState };