import { Client, Color } from "../client";

class MinClient {
    public address: string;
    public color: Color;

    constructor(origin: Client) {
        this.address = origin.ws.remoteAddress;
        this.color = origin.color;
    }
}

export { MinClient };