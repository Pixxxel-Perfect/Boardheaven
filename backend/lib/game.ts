import { GameState } from "./gameState";
import { Player, PlayerColor } from "./player";

class Game {
    public gameStates: GameState[] = [];
    public isFinished: boolean = false;

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

    public startGame() {
        // TODO Maybe send a message at this point, that the game is starting
        this.gameStates.push(new GameState(this));
    }

    public finishGame() {
        // I am throwing out everyone after a game
        // TODO That can/will be changed later to allow multiple games in succession
        this.isFinished = true;
        // TODO When disconnecting it would make sense to send some sort of finish message
        this.players.forEach(p => p.finishGame());
    }
}

export { Game };