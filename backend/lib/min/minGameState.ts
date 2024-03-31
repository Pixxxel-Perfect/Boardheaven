import { GameState } from "../gameState";
import { MinGamePiece } from "./minGamePiece";
import { MinPlayer } from "./minPlayer";


class MinGameState {
    public pieces: MinGamePiece[] = [];
    public playingPlayerIndex = 0;
    public diceThrow: number;
    public players: MinPlayer[] = [];

    public get currentPlayer(): MinPlayer {
        return this.players[this.playingPlayerIndex];
    }

    constructor(origin: GameState) {
        origin.pieces.forEach(p => this.pieces.push(new MinGamePiece(p)));
        this.diceThrow = origin.diceThrow;
        origin.players.forEach(p => this.players.push(new MinPlayer(p)));
    }
}

export { MinGameState };