import { dialog } from 'electron';
import React, { useState, useRef } from 'react';

const CameraComponent = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isTryingToOpenCamera, setIsTryingToOpenCamera] = useState(false);
  const [isCameraAvailable, setIsCameraAvailable] = useState(false);
  const videoRef = useRef(null);

  const openWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraOpen(true);
      setIsTryingToOpenCamera(true);
      setIsCameraAvailable(true);
    } catch (error) {
      setIsTryingToOpenCamera(true);
      setIsCameraAvailable(false);
      console.error('Error opening webcam:', error);
    }
  };

  const closeWebcam = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  };

  const handleDialogClose = () => {
    setIsTryingToOpenCamera(false);
  };

  return (
    <div className="grid flex-grow justify-center overflow-hidden artboard phone-1"
      style={{
        position: "relative",
        left: "22%",
        top: "10%",
        width: "80vh",
        height: "80vh",
      }}
    >
      <div className="grid flex-grow bg-base-200 justify-center rounded-box overflow-hidden artboard phone-1"
        style={{
          width: "100%",
          height: "90%",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          style={{
            width: "100%",
            height: "100%",
            transform: "scaleX(-1)",
          }}
        ></video>
        {isCameraOpen ? (
          <button className="btn btn-primary" onClick={closeWebcam}>
            Cerrar Webcam
          </button>
        ) : (
          <button id="openCameraButton" className="btn btn-primary" onClick={openWebcam}>
            Abrir Webcam
          </button>
        )}
        {!isCameraOpen && isTryingToOpenCamera && !isCameraAvailable && (
          <dialog className="modal backgroundModal" open>
            <form method="dialog" className="modal-box flex items-center flex-col h-52">
              <label htmlFor="openCameraButton" className='m-8 font-medium'>
                Cámara no conectada, por favor conecte una.
              </label>
              <button
                className="btn btn-warning mx-auto text-base"
                onClick={handleDialogClose}
              >
                Cerrar
              </button>
            </form>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default CameraComponent;
