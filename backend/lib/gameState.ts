import { textChangeRangeIsUnchanged } from "typescript";
import { Game } from "./game";
import { GamePiece } from "./gamePiece";
import { Player, PlayerColor } from "./player";
import { fail } from "assert";

//  TODO:
//      Add logic for skipping a turn automatically when in winning position
//      also add logic for ending the game when all are in winning position

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
        
        this.players.forEach(p => {
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
            //Todo end game
        }

        newGameState.switchToNextPlayer();
        return newGameState;
    }

    //Dude, I will have to optimize movePiece some day VVV

    // Position is a number ranging from -16 to -1 for the starting house
    // 0 to 39 for on the board
    // and add 100 for being in the end house
    public movePiece(piece: GamePiece): Boolean {
        //TODO test if in the house already.
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
                case PlayerColor.BLACK:
                    housePos = 39;
                    break;
                case PlayerColor.YELLOW:
                    housePos = 9;
                    break;
                case PlayerColor.GREEN:
                    housePos = 19;
                    break;
                case PlayerColor.RED:
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
        // SUPER dangerous
        // TODO Failsafe
        do {
            do {
                index = (this.playingPlayerIndex + 1) % 4;
            } while (!this.players[this.playingPlayerIndex]);
        } while (this.isPlayerFinished(this.currentPlayer));
    }

    public isPlayerFinished(player: Player): boolean {
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