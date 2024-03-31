import { writable } from 'svelte/store';
import type { GameState } from '../helper/gameState';
import type { Room } from '../helper/room';


export enum WsMessageType {
  //SERVER
  ROOM_STATUS,
  GAME_STATUS,
  GAME_FINISH,
  //CLIENT
  START_GAME,
  CHOOSE_COLOR,
  TURN_ACTION,
  //BOTH
  ERROR,
  CLOSE,
}

type WsComData = {
  messageType: WsMessageType,
  value: GameState | Room;
}

function createWebSocketStore() {
  const { subscribe, set } = writable<WsComData>();
  
  let ws: WebSocket | null = null;

  const connect = (url: string | "") => {
    if (ws?.readyState === WebSocket.OPEN) {
      console.log('WebSocket is already connected');
      return;
    }

    let connectTo: string = url;
    if (!connectTo) {
      connectTo = (window.location.protocol === "https" ? "wss://" : "ws://") + window.location.host;
    }

    ws = new WebSocket(connectTo);

    ws.onopen = () => {
      console.log("connected to server:", connectTo)
    };

    ws.onmessage = (ev) => {
      console.log("got msg")
      let wsData = JSON.parse(ev.data.toString()) as WsComData;
      console.log("the message:", ev.data.toString())
      set(wsData);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      ws = null; // Reset the WebSocket instance
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  const send = (message: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    } else {
      console.error("WebSocket is not connected");
    }
  };

  return {
    connect,
    subscribe,
    send
  };
}

export const websocketStore = createWebSocketStore();
