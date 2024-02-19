import { Game } from "./game";
import { GamePiece } from "./gamePiece";
import { Player, PlayerColor } from "./player";

//  TODO:
//      Add logic for skipping a turn automatically when in winning position
//      also add logic for ending the game when all are in winning position

class GameState {
    public pieces: GamePiece[] = [];
    public playingPlayerIndex = 0;
    public diceThrow: number;

    public get players() {
        return this.game.players;
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
        const newGameState = new GameState(this.game, this.pieces);

        if (newGameState.movePiece(piece)) return this;
        newGameState.switchToNextPlayer();
        //TODO Winning Check for players
        return newGameState;
    }


    // Position is a number ranging from -16 to -1 for the starting house
    // 0 to 39 for on the board
    // and add 100 for being in the end house
    public movePiece(piece: GamePiece): Boolean {
        //TODO test if in the house already.

        let newPos;
        // Test if piece can be initialized on the board
        if (piece.pos < 0) {
            if (this.diceThrow !== 6) return false;
            newPos = piece.color * 10;
        }else {

            //newPos = piece.pos + this.diceThrow;
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

        //TODO Test if new position is valid
        let possColPiece = this.getPieceAt(newPos);
        if (possColPiece) {
            if (possColPiece.color == piece.color) return false;
            possColPiece.capture();
        }

        //TODO
    }

    public switchToNextPlayer() {
        let index;
        // SUPER dangerous
        // TODO Failsafe
        do {
            index = (this.playingPlayerIndex + 1) % 4;
        } while (!this.players[this.playingPlayerIndex]);
    }

    public skipTurn() {
        const newGameState = new GameState(this.game, this.pieces);
        newGameState.switchToNextPlayer();
    }

    public isPlayerFinished(player: Player): boolean {
        //TODO
    }

    public shouldEnd(): boolean {
        //TODO
    }

    public getPieceAt(pos: number): GamePiece | null {
        return this.pieces.find(p => p.pos = pos) ?? null;
    }
}

export { GameState };