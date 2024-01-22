import { Client } from "./client";
import { GamePiece } from "./gamePiece";
import { Player } from "./player";

class GameState {
    public players: Player[] = [];

    constructor(players: Player[]) {
        this.players.forEach(c => this.players.push(p));
    }

    public nextGameState(piece: GamePiece) {

    }
}

export { GameState };