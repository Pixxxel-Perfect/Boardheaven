import { GameState } from "./gameState";
import { Player, PlayerColor } from "./player";
import { WsMessage, WsMessageType } from "./wsMessage";

class Game {
    public gameStates: GameState[] = [];

    public get currentGameState() {
        return this.gameStates[this.gameStates.length - 1];
    }

    constructor(public players: Player[]) {
        // Any player that doesn't choose a color will enter a spectator state
        players
        .filter(p => p.color == PlayerColor.NOT_SET)
        .forEach(p => p.isSpectator = true);

        this.players.sort((p1, p2) => p1.color - p2.color);
    }

    public broadcast(message: WsMessage<unknown>) {
        this.players.forEach(p => p.send(message));
    }

    public startGame() {
        this.gameStates[0] = new GameState(this);
        this.broadcast(new WsMessage<GameState>(WsMessageType.GAME_STATUS, this.gameStates[0]));
    }

    public finishGame() {
        this.players.forEach(p => p.finishGame());
    }
}

export { Game };