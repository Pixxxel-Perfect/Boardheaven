import { expect, test } from "bun:test";
import { GameState } from "../lib/gameState";
import { Room } from "../lib/room";
import { Client, Color } from "../lib/client";
import { MockServerWebsocket } from "./mock";
import { WsData } from "../lib/wsData";
import { MinGamePiece } from "../lib/min/minGamePiece";

function generateValidClients(count: number): Client[] {
    const clients = [];
    for (let i = 0; i < count; i++) {
        clients.push(new Client(new MockServerWebsocket("mockAddress" + i, new WsData("code", null))));
    }
    return clients;
}

function generateValidRoom(clientCount: number): Room {
    const clients = generateValidClients(clientCount);
    const room = new Room(clients[0]);
    const iterCount = Math.min(clientCount, 4);
    for (let i = 1; i < iterCount; i++) {
        room.addClient(clients[i]);
    }
    return room;
}

test("should create gamestate", () => {
    const room = generateValidRoom(4);

    const gameState = new GameState(room);

    expect(gameState).toBeTruthy();
});

test("movePiece should move inside house", () => {
    const room = generateValidRoom(4);
    const gameState = new GameState(room);
    //@ts-expect-error: private property
    gameState._pieces[0].pos = 39;
    gameState.diceThrow = 3;
    const piece = gameState.pieces[0];
    const minGamePiece = new MinGamePiece(piece.homePos, piece.pos, piece.color as number, piece.initPos);

    gameState.makeMoveWithPiece(minGamePiece);

    expect(gameState.pieces[0].pos).toBeGreaterThan(100);
});

test("movePiece should not let invalid color move", () => {
    const room = generateValidRoom(4);
    const gameState = new GameState(room);
    const piece = gameState.pieces[0];
    const minGamePiece = new MinGamePiece(piece.homePos, piece.pos, piece.color as number, piece.initPos);
    gameState.currentPlayerColor = Color.GREEN;

    const output = gameState.makeMoveWithPiece(minGamePiece);

    expect(output).toBeFalse();
});