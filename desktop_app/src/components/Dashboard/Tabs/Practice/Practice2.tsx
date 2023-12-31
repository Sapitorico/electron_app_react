import { useState } from "react";
import sendImages from "@/components/websocket/socket";

export default function Practice() {
  const [isCameraOpen, setCameraOpen] = useState(false);
  const [isTryingToOpenCamera, setIsTryingToOpenCamera] = useState(false);
  const [isCameraAvailable, setIsCameraAvailable] = useState(false);

  function openWebcam() {
    setCameraOpen(true);
    setIsTryingToOpenCamera(true);
    setIsCameraAvailable(true);
    const video = document.getElementById("video") as HTMLVideoElement;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
        video.style.transform = "scaleX(-1)";
        obtainfps(video);
      })
      .catch((error) => {
        setIsTryingToOpenCamera(true);
        setIsCameraAvailable(false);
        console.log("Error accessing webcam: " + error.toString());
      });
  }

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

  function closeWebcam() {
    const video = document.getElementById("video") as HTMLVideoElement;
    video.pause();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    video.srcObject?.getTracks().forEach((track) => {
      track.stop();
    });
    video.srcObject = null;
    clearInterval(intervalId);
    setCameraOpen(false);

    //location.reload()
  }

  const handleDialogClose = () => {
    setIsTryingToOpenCamera(false);
  };

  return (
    <div
      className="grid flex-grow justify-center overflow-hidden artboard phone-1"
      style={{
        position: "relative",
        left: "22%",
        top: "10%",
        width: "80vh",
        height: "80vh",
      }}
    >
      <div
        className="grid flex-grow bg-base-200 justify-center rounded-box overflow-hidden artboard phone-1"
        style={{
          width: "100%",
          height: "90%",
        }}
      >
        <video
          autoPlay
          style={{
            width: "100%",
            height: "100%",
            transform: "scaleX(-1)",
          }}
        ></video>
        <canvas width="640" height="480" className="hidden"></canvas>
        {isCameraOpen ? (
          <button className="btn btn-primary" onClick={closeWebcam}>
            Cerrar Webcam
          </button>
        ) : (
          <button
            id="openCameraButton"
            className="btn btn-primary"
            onClick={openWebcam}
          >
            Abrir Webcam
          </button>
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
  );
}
