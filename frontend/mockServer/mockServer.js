// ws server for testing
const WebSocket = require('ws');


//ws server on port 88888
const server = new WebSocket.Server({
  port: 8888
});

let sockets = [];
server.on('connection', function (socket) {
  console.log("got a connection!!!")
  sockets.push(socket);

  // When you receive a message, send that message to every socket.
  socket.on('message', function (msg) {
    console.log("got a message from a client!  ", msg.toString())
    socket.send("here is there server talking to you!")
  });

  // When a socket closes, or disconnects, remove it from the array.
  socket.on('close', function () {
    sockets = sockets.filter(s => s !== socket);
  });
});
