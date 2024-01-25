import { GameState } from "./gameState";
import { Player, PlayerColor } from "./player";

class Game {
    public gameStates: GameState[] = [];

    public get currentGameState() {
        return this.gameStates[this.gameStates.length - 1];
    }

    constructor(public players: Player[]) {
        players.forEach(p => {
            if (p.color = PlayerColor.NOT_SET) p.disconnect();
        });
    }

    public startGame() {
        //TODO ORDER PLAYERS BY COLOR FOR GAMESTATE
        //AND PUT NULL IN UNOCCOUPIED SPOTS
        this.gameStates.push(new GameState(this));
    }

    public finishGame() {
        // I am throwing out everyone after a game
        // That can/will be changed later to allow multiple games in succession
        this.players.forEach(p => p.disconnect());
    }
}

export { Game };