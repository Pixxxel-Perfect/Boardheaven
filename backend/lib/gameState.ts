import { Game } from "./game";
import { GamePiece } from "./gamePiece";
import { Player } from "./player";

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
            pieces.forEach(p => this.pieces.push(GamePiece.of(p)));
            return;
        }
        this.players.forEach(p => {
            for (let i = 1; i <= 4; i++) {
                this.pieces.push(new GamePiece(p, ))
                //TODO finish filling up this crap
            }
        });
    }

    public nextGameState(piece: GamePiece): GameState {
        const newGameState = new GameState(this.game, this.pieces);

        if (newGameState.movePiece(piece)) return this;
        newGameState.switchToNextPlayer();

        return newGameState;
    }


    // Position is a number ranging from -16 to -1 for the starting house
    // 1 to 40 for on the board
    // and add piece.color * 100 for being in the end house
    public movePiece(piece: GamePiece): Boolean {
        //TODO

        // Test if piece can be initialized on the board
        if (piece.pos < 0 && this.diceThrow !== 6) {
            return false;
        }

        let newPos = (piece.pos + this.diceThrow) % 40;

        //TODO logic for the branching path

        //test if new position is valid
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

    public playerIsFinished(player: Player) {
        //TODO
    }

    public shouldEnd() {
        //TODO
    }
}

export { GameState };