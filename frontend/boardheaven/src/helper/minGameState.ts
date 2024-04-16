import type { MinGamePiece } from "./minGamePiece";
import type { MinColor } from "./minClient";

class MinGameState {
    constructor(
        public pieces: MinGamePiece[] = [],
        public currentPlayerColor: MinColor,
        public diceThrow: number,
        ) {}
}

export { MinGameState };