import React, { useRef, useState } from 'react';
import gifImage from 'src/data/gifts/pato-caminando.gif'; // Reemplaza la ruta con la ubicación de tu archivo GIF

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
        <div className="flex flex-col w-full">
          <div className="grid h-20 card rounded-box place-items-center">
            <div className="flex w-full">
              <div className="grid h-20 flex-grow bg-base-300 rounded-box place-items-center artboard phone-1">
              <img src={gifImage} alt="GIF" style={{width: '20%', height: '30%'}}/>
              </div>
              <div className="divider divider-horizontal"></div>
              <div className="grid h-20 flex-grow card bg-base-200 rounded-box place-items-center artboard phone-1">
                <video ref={videoRef} autoPlay style={{width: '50%', height: '50%', transform: 'scaleX(-1)'}}></video>
                {isCameraOpen ? (
                    <button onClick={closeWebcam}>Cerrar Webcam</button>
                ) : (
                    <button onClick={openWebcam}>Abrir Webcam</button>
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
