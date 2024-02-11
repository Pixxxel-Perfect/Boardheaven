// ws server for testing
const WebSocket = require('ws');


//ws server on port 88888
const server = new WebSocket.Server({
  port: 8888
});

const generateRoomIdMessage = ()=> {
  return {
    type: 6,
    value: 12987
  }
}

const generateResponseColorSelected = (color) =>{
  return {
    type: 7, //a gamer selected a color
    value: color //color value
  }
}

let sockets = [];
server.on('connection', function (socket) {
  console.log("got a connection!!!")
  sockets.push(socket);

  console.log("sending the room ID")
  socket.send(JSON.stringify(generateRoomIdMessage()))

  // When you receive a message: now we can mock
  socket.on('message', function (msg) {
    console.log(msg.toString())
    const data = JSON.parse(msg.toString())
    if (!data) return
    
    let genereatedResponse = {}
    //client send setcolor
    if (data.type === 0) {
      // do whatever, but let us respond all clients the color is selected
      genereatedResponse = generateResponseColorSelected(data.value)
    }
    //send to all
    sockets.forEach(sock => {
      sock.send(JSON.stringify(genereatedResponse))
    });

  });

  // When a socket closes, or disconnects, remove it from the array.
  socket.on('close', function () {
    sockets = sockets.filter(s => s !== socket);
  });
});
