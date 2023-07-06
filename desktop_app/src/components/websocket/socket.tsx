let socket: WebSocket;
socket = new WebSocket("ws://127.0.0.1:8001");

const endPoints = [
  "ws://127.0.0.1:8000/Letter",
  "ws://127.0.0.1:8000/Number",
  "ws://127.0.0.1:8000",
];

export default function sendImages(imageData, WichEndPoint, dominantHand) {
  //envia las imagenes la server
  if (socket.readyState === WebSocket.OPEN) {
    //console.log('enviando imagen...');
    socket.send(JSON.stringify([imageData, dominantHand]));
  } else {
    socket = new WebSocket(endPoints[WichEndPoint]);
    socket.onopen = function () {
      console.log("webSocket connection established");
    };
  }

  socket.onmessage = function (event) {
    const message = event.data;
    //message es lo que devuelve el modelo
    console.log(message);
  };

  socket.onclose = function () {
    console.log("WebSocket connection closed");
  };
}
