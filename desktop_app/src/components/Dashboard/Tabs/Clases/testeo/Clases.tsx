import { useState, useRef, useEffect } from "react";
import gifImage from "src/data/gifts/A.gif";
import { selectedTabType } from "@/types/dataTypes";
import ImgDisplay from "./ImgComp";
import sendImages from "@/components/websocket/socket";
import Progress from "./Progress";

interface LessonsProps {
  handleSelectTab: (value: selectedTabType) => void;
  WichEndPoint: number;
}

export default function Lessons({
  handleSelectTab,
  WichEndPoint,
}: LessonsProps) {
  const [isCameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  function openWebcam() {
    setCameraOpen(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          videoRef.current.style.transform = "scaleX(-1)";
          obtainfps();
        }
      })
      .catch((error) => {
        console.log("Error accessing webcam: " + error.toString());
      });
  }

  function obtainfps() {
    if (videoRef.current && canvasRef.current) {
      intervalRef.current = setInterval(() => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const canvas = canvasRef.current!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const context = canvas.getContext("2d")!;
        context.drawImage(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          videoRef.current!,
          0,
          0,
          canvas.width,
          canvas.height
        );
        const imageData = canvas.toDataURL("image/jpeg");
        sendImages(imageData, WichEndPoint);
      }, 200);
    }
  }

  function closeWebcam() {
    if (videoRef.current) {
      videoRef.current.pause();
      const stream = videoRef.current.srcObject as MediaStream | null;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
      videoRef.current.srcObject = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setCameraOpen(false);
  }

  return (
    <div className="mainContainer flex flex-col h-screen mx-auto">
      <div className="flex items-center w-20">
        <button
          className="btn-primary w-44 h-10 rounded-md mt-3 flex items-center"
          onClick={() => {
            handleSelectTab("educacion");
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
            <video ref={videoRef} autoPlay className="w-max h-max"></video>
            <canvas
              ref={canvasRef}
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
        </div>
      </div>
      <div className="divider"></div>
      <div className="w-full flex m-4">
        <Progress />
      </div>
    </div>
  );
}
