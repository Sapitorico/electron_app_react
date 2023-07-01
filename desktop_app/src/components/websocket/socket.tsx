let socket: WebSocket

export default function sendImages(imageData) {
  //envia las imagenes la server
  if (socket.readyState === WebSocket.OPEN) {
    //console.log('enviando imagen...');
    let hand = document.querySelectorAll('button[name="hand"]')
    let handtype
    if (hand[0].checked) {
      handtype = "Left"
    } else handtype = "Right"
    socket.send(JSON.stringify([imageData, handtype]));
  } else {
    socket = new WebSocket('ws://127.0.0.1:8000');
    socket.onopen = function() {
      console.log('webSocket connection established');
    };
  };


  socket.onmessage = function(event) {
    const message = event.data;
  //message es lo que devuelve el modelo
    console.log(message);
    
}

  socket.onclose = function() {
    
    console.log('WebSocket connection closed');
  };

}