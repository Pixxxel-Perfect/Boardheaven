import { GameState } from "./gameState";

class Game {
    public gameStates: GameState[] = [];

    public get currentGameState() {
        return this.gameStates[this.gameStates.length - 1];
    }

    constructor() {
        this.gameStates.push(new GameState());
    }
}

export { Game };