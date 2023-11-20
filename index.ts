Bun.serve({
    fetch(req: Request): Response | Promise<Response> {
        if (this.upgrade(req)) {
            console.log("websocket online")
        }
      return new Response("Connect via Websocket please.");
    },
    websocket: {
        message(ws, message) {
            console.log(message);
            ws.send(message);
        },
    }
});