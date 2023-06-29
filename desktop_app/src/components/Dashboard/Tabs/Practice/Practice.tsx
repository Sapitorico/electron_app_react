import React, { useRef, useState } from "react";

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
      videoRef.current.style.transform = "scaleX(-1)";
      streamRef.current = stream;
      setCameraOpen(true);
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const closeWebcam = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      videoRef.current.style.transform = "";
      streamRef.current = null;
      setCameraOpen(false);
    }
  };

  return (
    <div className="grid flex-grow justify-center overflow-hidden artboard phone-1" 
    style={{
      position: "relative",
      left: "22%",
      top: "10%",
      width: "80vh",
      height: "80vh",
    }}>
      <div class="grid flex-grow bg-base-200 justify-center rounded-box overflow-hidden artboard phone-1"
      style={{
        width: "100%",
        height: "90%",
      }}>
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
          <button className="btn btn-primary" onClick={openWebcam}>
            Abrir Webcam
          </button>
        )}
        </div>
        </div>
  );
}