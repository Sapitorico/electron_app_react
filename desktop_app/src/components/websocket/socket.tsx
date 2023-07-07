export let socket = new WebSocket("ws://127.0.0.1:8001");

const endPoints = [
  "ws://127.0.0.1:8000/Letter",
  "ws://127.0.0.1:8000/Number",
  "ws://127.0.0.1:8000",
];

let messageCallback: (message: string) => void;

export function setMessageCallback(callback: (message: string) => void) {
  messageCallback = callback;
}

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

  socket.onmessage = function hola(event) {
    const message = event.data;
    messageCallback(message);

    //message es lo que devuelve el modelo
  };

  socket.onclose = function () {
    console.log("WebSocket connection closed");
  };
}
