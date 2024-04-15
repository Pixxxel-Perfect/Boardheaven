import { Client, Color } from "./client";
import { GameState } from "./gameState";
import { MinGamePiece } from "./min/minGamePiece";
import { Player } from "./player";

class Game {
    public gameStates: GameState[] = [];

    public get currentGameState() {
        return this.gameStates[this.gameStates.length - 1];
    }

    constructor(public players: Player[]) {
        // Any player that doesn't choose a color will enter a spectator state
        players
        .filter(p => p.color == Color.NOT_SET)
        .forEach(p => p.isSpectator = true);

        this.players.sort((p1, p2) => p1.color - p2.color);
    }

    public startGame(): void {
        const firstPlayer = this.players.filter(p => !p.isSpectator)[0];
        this.gameStates[0] = new GameState(this, this.players.indexOf(firstPlayer), Math.floor(Math.random() * 6) + 1);
    }

    public nextGameState(piece: MinGamePiece): void {
        const nextGameState = this.currentGameState.nextGameState(piece);
        if (nextGameState.equals(this.currentGameState)) {
            console.log("game state not changed");
            return;
        }
        this.gameStates.push(this.currentGameState.nextGameState(piece));
    }

    public finishGame(): void {
        this.players.forEach(p => p.finishGame());
    }

    public getPlayer(client: Client): Player | null {
        return this.players.find(p => p.equals(client)) ?? null;
    }
}

export { Game };