import { Client, Color } from "./client";
import { GamePiece } from "./gamePiece";
import { GameState } from "./gameState";
import { Player } from "./player";
import { WsMessage, WsMessageType } from "./wsMessage";

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

    public broadcast(message: WsMessage<unknown>): void {
        this.players.forEach(p => p.send(message));
    }

    public startGame(): void {
        this.gameStates[0] = new GameState(this);
        this.broadcast(new WsMessage<GameState>(WsMessageType.GAME_STATUS, this.gameStates[0]));
    }

    public nextGameState(piece: GamePiece): void {
        const nextGameState = this.currentGameState.nextGameState(piece);
        if (nextGameState.equals(this.currentGameState)) return;
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