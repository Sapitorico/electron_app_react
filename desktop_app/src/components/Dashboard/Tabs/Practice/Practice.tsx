import { useState } from "react";
import sendImages from "@/components/websocket/socket";

export default function Practice() {
  const [isCameraOpen, setCameraOpen] = useState(false);
  const [isTryingToOpenCamera, setIsTryingToOpenCamera] = useState(false);
  const [isCameraAvailable, setIsCameraAvailable] = useState(false);

  const openWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setCameraOpen(true);
      setIsTryingToOpenCamera(true);
      setIsCameraAvailable(true);
    } catch (error) {
      setIsTryingToOpenCamera(true);
      setIsCameraAvailable(false);
      console.error('Error opening webcam:', error);
    }
  };

  let intervalId: NodeJS.Timeout;

  function obtainfps(video: HTMLVideoElement) {
    intervalId = setInterval(() => {
      const canvas = document.getElementById("canvas") as HTMLCanvasElement;
      const context = canvas.getContext("2d");
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg");
      sendImages(imageData, 2);
    }, 200);
  }

  const closeWebcam = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraOpen(false);
  };

  const handleDialogClose = () => {
    setIsTryingToOpenCamera(false);
  };

  return (
    <><div
      className="grid flex-grow justify-center overflow-hidden artboard phone-1"
      style={{
        position: "relative",
        left: "22%",
        top: "4%",
        width: "80vh",
        height: "80vh",
      }}
    >
      <div
        className="grid flex-grow bg-base-200 justify-center rounded-box overflow-hidden artboard phone-1"
        style={{
          width: "100%",
          height: "87%",
        }}
      >
        <video
          id="video"
          autoPlay
          style={{
            width: "100%",
            height: "100%",
            transform: "scaleX(-1)",
          }}
        ></video>
        <canvas
          id="canvas"
          width="640"
          height="480"
          className="hidden"
        ></canvas>
        {isCameraOpen ? (
          <>
            <button className="btn btn-primary" onClick={closeWebcam}>
              Cerrar Webcam
            </button>
          </>
        ) : (
          <>
            <button
              id="openCameraButton"
              className="btn btn-primary"
              onClick={openWebcam}
            >
              Abrir Webcam
            </button>
          </>
        )}
        {!isCameraOpen && isTryingToOpenCamera && !isCameraAvailable && (
          <dialog className="modal backgroundModal" open>
            <form
              method="dialog"
              className="modal-box flex items-center flex-col h-52"
            >
              <label htmlFor="openCameraButton" className="m-8 font-medium">
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
    <div
      style={{
        width: "84vh",
        height: "100px",
        borderRadius: "15px",
        backgroundColor: "transparent",
        marginTop: "20px",
        top: "-7%",
        left: "20.8%",
        position: "relative",
      }}
    >
        <span className="flex flex-col p-4 border-primary border-[5px] m-4 items-center gap-4 rounded-box">Tu seña es:</span></div></>
  );
}