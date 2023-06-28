import React, { useRef, useState } from 'react';
import gifImage from 'src/data/gifts/frog-sitting.gif'; // Reemplaza la ruta con la ubicación de tu archivo GIF

export default function Practice() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [isCameraOpen, setCameraOpen] = useState(false);

  const openWebcam = async () => {
    if (isCameraOpen) {
      closeWebcam();
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.style.transform = 'scaleX(-1)';
      streamRef.current = stream;
      setCameraOpen(true);
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const closeWebcam = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      videoRef.current.style.transform = '';
      streamRef.current = null;
      setCameraOpen(false);
    }
  };

  return (
      <div className="flex m-5">
        <div className="w-full">
          <div className="">
            <div className="flex">
              <div className="flex card bg-base-300 place-items-center justify-center overflow-hidden">
                <img src={gifImage} alt="GIF" style={{width: '100%', height: '10%'}}/>
              </div>
              <div className="divider divider-horizontal"></div>
              <div className="grid flex-grow bg-base-200 justify-center rounded-box overflow-hidden artboard phone-1">
                <video ref={videoRef} autoPlay style={{width: '100%', height: '100%', transform: 'scaleX(-1)'}}></video>
                {isCameraOpen ? (
                    <button className="btn btn-primary" onClick={closeWebcam}>Cerrar Webcam</button>
                ) : (
                    <button className="btn btn-primary" onClick={openWebcam}>Abrir Webcam</button>
                )}
              </div>
            </div>
            <div className="divider"></div>
            <div className="w-full">
              <ul className="w-full steps lg:steps-horizontal">
                <li className="step step-primary">clases</li>
                <li className="step step-primary">practica</li>
                <li className="step">quiz</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
}
