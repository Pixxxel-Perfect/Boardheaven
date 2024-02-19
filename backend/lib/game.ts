import { GameState } from "./gameState";
import { Player, PlayerColor } from "./player";

class Game {
    public gameStates: GameState[] = [];
    public isFinished: boolean = false;

    public get currentGameState() {
        return this.gameStates[this.gameStates.length - 1];
    }

    constructor(public players: Player[]) {
        // This disconnects every player, that didn't choose a color
        // This could be changed to logic that only starts the game once every player has choosen a color
        players.forEach(p => {
            if (p.color = PlayerColor.NOT_SET) p.disconnect();
        });
    }

    public startGame() {
        this.players.sort((p1, p2) => p1.color - p2.color);
        // Maybe send a message at this point, that the game is starting
        this.gameStates.push(new GameState(this));
    }

    public finishGame() {
        // I am throwing out everyone after a game
        // That can/will be changed later to allow multiple games in succession
        this.isFinished = true;
        // When disconnecting it would make sense to send some sort of finishe message
        this.players.forEach(p => p.disconnect());
    }
}

export { Game };