import { ServerWebSocket } from "bun";
import { WsData } from "./wsData";
import { Client, Color } from "./client";
import { WsMessage, WsMessageType } from "./wsMessage";

class Player extends Client {
    public static fromClient(client: Client): Player {
        return new this(client.ws, client.color);
    }

    public static fromClients(clients: Client[]): Player[] {
        const players: Player[] = [];

        clients.forEach(c => players.push(Player.fromClient(c)));
        
        return players;
    }

    public isSpectator: boolean = false;
    
    public constructor(ws: ServerWebSocket<WsData>, public color: Color = Color.NOT_SET) {
        super(ws);
        color = color;
    }

    public finishGame() {
        // I am throwing out everyone after a game
        // TODO That can/will be changed later to allow multiple games in succession
        this.send(new WsMessage(WsMessageType.GAME_FINISH, null));
        this.disconnect();
    }
}

export { Player };