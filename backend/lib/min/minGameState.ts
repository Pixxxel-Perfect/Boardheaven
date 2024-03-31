import { MinGamePiece } from "./minGamePiece";
import { MinPlayer } from "./minPlayer";


class MinGameState {
    public get currentPlayer(): MinPlayer {
        return this.players[this.playingPlayerIndex];
    }

    constructor(
        public pieces: MinGamePiece[],
        public playingPlayerIndex: number,
        public diceThrow: number,
        public players: MinPlayer[]
        ) {}
}

export { MinGameState };