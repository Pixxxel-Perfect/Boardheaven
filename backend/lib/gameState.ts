import { Player } from "./player"
import { GamePiece } from "./gamePiece";

class GameState {
    public players: Player[];
    public playingPlayer: Player;

    constructor(players: Player[]) {
        this.players = players;
        this.playingPlayer = this.players[0];
    }
}

function calcNextState(gameState: GameState, piece: GamePiece): GameState {
    /*
    TODO:
        Validate move
        Do the move
    */
}