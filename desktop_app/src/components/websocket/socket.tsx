let socket: WebSocket;
socket = new WebSocket("ws://127.0.0.1:8001");

export default function sendImages(imageData) {
  //envia las imagenes la server
  if (socket.readyState === WebSocket.OPEN) {
    //console.log('enviando imagen...');
    let hand = document.querySelectorAll(
      'button[name="hand"][class="btn btn-active"]'
    );

    let handtype = hand[0].value;

    socket.send(JSON.stringify([imageData, handtype]));
  } else {
    socket = new WebSocket("ws://127.0.0.1:8000");
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