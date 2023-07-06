import { useState } from "react";
import gifImage from "src/data/gifts/frog-sitting.gif";
import { selectedTabType } from "@/types/dataTypes";
import ImgDisplay from "./ImgComp";
import sendImages from "@/components/websocket/socket";
import Progress from "./Progress";

export default function Lessons({
  handleSelectTab,
  WichEndPoint,
}: {
  handleSelectTab: (value: selectedTabType) => void;
  WichEndPoint: number;
}) {
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
      sendImages(imageData, WichEndPoint);
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
    <div className="mainContainer flex flex-col h-screen mx-auto">
      <div className="flex items-center w-20">
        <button
          className="btn-primary w-44 h-10 rounded-md mt-3 flex items-center"
          onClick={() => {
            handleSelectTab("educacion");
            closeWebcam();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mr-2 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
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
            <video id="video" autoPlay className="w-max h-max"></video>
            <canvas
              id="canvas"
              width="640"
              height="480"
              className="hidden"
            ></canvas>
          </div>
          {isCameraOpen ? (
            <button
              className="btn btn-primary w-60 mt-3 mx-auto"
              onClick={closeWebcam}
            >
              Cerrar Webcam
            </button>
          ) : (
            <button
              className="btn btn-primary w-full mt-3 mx-auto"
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
      <div className="divider"></div>
      <div className="w-full flex m-4">
        <Progress />
      </div>
    </div>
  );
}
