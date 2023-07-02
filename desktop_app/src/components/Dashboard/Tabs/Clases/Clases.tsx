import React, { useRef, useState } from "react";
import gifImage from "src/data/gifts/frog-sitting.gif"; // Reemplaza la ruta con la ubicación de tu archivo GIF
import { selectedTabType } from "@/types/dataTypes";
import ImgDisplay from "./ImgComp";
import sendImages from "@/components/websocket/socket";
import Progress from "./Progress";

export default function Practice({ handleSelectTab }: { handleSelectTab: (value: selectedTabType) => void; }) {

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
      track.stop();
    });
    video.srcObject = null;
    clearInterval(intervalId)
    setCameraOpen(false)
    //location.reload()
  }

  return (
    <div className="mainContainer flex flex-col h-screen mx-auto">
      <div className="flex items-center w-20">
        <button className="btn-primary w-44 h-10 rounded-md mt-3 flex items-center" onClick={() => { handleSelectTab("educacion") }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
            strokeWidth="1.5" stroke="currentColor"
            className="w-6 h-6 mr-2 ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
          </svg>
          <span className="order-last mr-2 font-medium">Volver</span>
        </button>
      </div>
      <div className="divider"></div>
      <div className="flex flex-grow justify-center items-center">
        <ImgDisplay gifImage={gifImage} />
        <div className="divider divider-horizontal w-px h-full"></div>
        <div className="flex flex-col items-center mx-auto">
          <div className="grid bg-base-200 justify-center rounded-box overflow-hidden">
            <video
              id="video"
              autoPlay
              className=" w-max h-max"
            ></video>
            <canvas id="canvas" width="640" height="480" className="hidden"></canvas>

          </div>
          {isCameraOpen ? (
            <button className="btn btn-primary w-60 mt-3 mx-auto" onClick={closeWebcam}>
              Cerrar Webcam
            </button>
          ) : (
            <button className="btn btn-primary w-full mt-3 mx-auto" onClick={openWebcam}>
              Abrir Webcam
            </button>
          )}
        </div>
      </div>
      <div className="divider"></div>
      <div className="w-full flex m-4">
      <Progress />
      </div>
    </div>
  );


}
