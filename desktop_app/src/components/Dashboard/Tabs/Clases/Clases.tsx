import React, { useRef, useState } from "react";
import gifImage from "src/data/gifts/frog-sitting.gif"; // Reemplaza la ruta con la ubicación de tu archivo GIF
import { selectedTabType } from "@/types/dataTypes";
import ImgDisplay from "./ImgComp";
import sendImages from "@/components/websocket/socket";

export default function Practice({handleSelectTab}:{handleSelectTab: (value: selectedTabType) => void;}) {
  
  const [isCameraOpen, setCameraOpen] = useState(false);

  function openWebcam() {
    setCameraOpen(true)
    const video = document.getElementById('video');
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
        video.style.transform = 'scaleX(-1)'
        obtainfps(video)
      })
      .catch((error) => {
        console.log('Error accessing webcam: ' + error.toString());
      });
};
let intervalId;

function obtainfps(video) {
  intervalId = setInterval(() => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d')
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');
    sendImages(imageData)
  }, 200);
}

function closeWebcam() {
  
  video.pause();
  video.srcObject.getTracks().forEach((track) => {
    track.stop();});
  video.srcObject = null;
  clearInterval(intervalId)
  setCameraOpen(false)
  //location.reload()
}

  return (
    <div className="mainContainer flex flex-col h-screen w-screen">
      <div className="flex flex-grow justify-center items-center">
        <ImgDisplay gifImage={gifImage} />
        <div className="divider divider-horizontal w-px h-full"></div>
        <div className="grid   bg-base-200 justify-center rounded-box overflow-hidden  h-96 w-10/12 p-4 ">
          <video
            id="video"
            autoPlay
            style={{
            
            }}
          ></video>
          <canvas id="canvas" width="640" height="480" className="hidden"></canvas>
          {isCameraOpen ? (
            <button className="btn btn-primary" onClick={closeWebcam}>
              Cerrar Webcam
            </button>
          ) : (
            <button className="btn btn-primary" onClick={openWebcam}>
              Abrir Webcam
            </button>
          )}
        </div>
      </div>
      
      <div className="divider"></div>
      <button className="btn btn-primary" onClick={() => {handleSelectTab("educacion")}} >Volver</button>
      <div className="w-full flex m-4">
      <ul className="steps w-screen">
      <li className="step step-primary">clases</li>
      <li className="step step-primary">practica</li>
      <li className="step">quiz</li>
      </ul>
      
      </div>

    </div>
  );
  
  
}
