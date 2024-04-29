import { ServerWebSocket } from "bun";
import { WsData } from "../lib/wsData";

class MockServerWebsocket implements ServerWebSocket<WsData> {
    constructor(public remoteAddress: string, public data: WsData) {}
    send(data: string | BufferSource, compress?: boolean | undefined): number {
        console.log(`[TEST] sending to client ${this.remoteAddress}, message: ${data}`)
        throw new Error("Method not implemented.");
    }
    sendText(data: string, compress?: boolean | undefined): number {
        throw new Error("Method not implemented.");
    }
    sendBinary(data: BufferSource, compress?: boolean | undefined): number {
        throw new Error("Method not implemented.");
    }
    close(code?: number | undefined, reason?: string | undefined): void {
        throw new Error("Method not implemented.");
    }
    terminate(): void {
        throw new Error("Method not implemented.");
    }
    ping(data?: string | BufferSource | undefined): number {
        throw new Error("Method not implemented.");
    }
    pong(data?: string | BufferSource | undefined): number {
        throw new Error("Method not implemented.");
    }
    publish(topic: string, data: string | BufferSource, compress?: boolean | undefined): number {
        throw new Error("Method not implemented.");
    }
    publishText(topic: string, data: string, compress?: boolean | undefined): number {
        throw new Error("Method not implemented.");
    }
    publishBinary(topic: string, data: BufferSource, compress?: boolean | undefined): number {
        throw new Error("Method not implemented.");
    }
    subscribe(topic: string): void {
        throw new Error("Method not implemented.");
    }
    unsubscribe(topic: string): void {
        throw new Error("Method not implemented.");
    }
    isSubscribed(topic: string): boolean {
        throw new Error("Method not implemented.");
    }
    cork<T>(callback: (ws: ServerWebSocket<T>) => T): T {
        throw new Error("Method not implemented.");
    }
    readyState: WebSocketReadyState = 1;
    binaryType?: "nodebuffer" | "arraybuffer" | "uint8array" | undefined;
}

export { MockServerWebsocket };