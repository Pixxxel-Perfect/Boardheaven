
import { writable } from 'svelte/store';

function createWebSocketStore() {
  const { subscribe, set, update } = writable<WebSocket>();

  function connect(url: string) {
    const ws = new WebSocket(url);
    ws.onopen = () => {
      //console.log('connected')
      set(ws);
    }
  }

  /*function send(data: any) {
    subscribe((ws) => {
      if (ws) {
        //console.log("store->sending")
        ws.send(JSON.stringify(data));
      }
    });
  }*/

  return {
    subscribe,
    connect
    //send,
  };
}

export const websocketStore = createWebSocketStore();