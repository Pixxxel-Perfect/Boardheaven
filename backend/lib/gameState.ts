import { Game } from "./game";
import { GamePiece } from "./gamePiece";

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
        if (!pieces) return;
        pieces.forEach(p => this.pieces.push(GamePiece.of(p)));
    }

    public nextGameState(piece: GamePiece): GameState {
        const newGameState = new GameState(this.game, this.pieces);

        if (newGameState.movePiece(piece)) return this;
        newGameState.switchToNextPlayer();

        return newGameState;
    }

    public movePiece(piece: GamePiece): Boolean {
        //TODO
    }

    public switchToNextPlayer() {
        let index;
        //SUPER dangerous
        do {
            index = (this.playingPlayerIndex + 1) % 4;
        } while (!this.players[this.playingPlayerIndex]);
    }

    public skipTurn() {
        const newGameState = new GameState(this.game, this.pieces);
        newGameState.switchToNextPlayer();
    }
}

export { GameState };