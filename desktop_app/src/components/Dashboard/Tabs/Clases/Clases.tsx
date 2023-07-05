// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState, useRef, useEffect } from "react";
import gifImageA from "src/data/gifts/A.gif";
import gifImageB from "src/data/gifts/B.gif";
import gifImageC from "src/data/gifts/C.gif";
import gifImageD from "src/data/gifts/D.gif";
import gifImageE from "src/data/gifts/E.gif";
import gifImageF from "src/data/gifts/F.gif";
import gifImageG from "src/data/gifts/G.gif";
import gifImageH from "src/data/gifts/H.gif";
import gifImageI from "src/data/gifts/I.gif";
import gifImageJ from "src/data/gifts/J.gif";
import gifImageK from "src/data/gifts/K.gif";
import gifImageL from "src/data/gifts/L.gif";
import gifImageM from "src/data/gifts/M.gif";
import gifImageN from "src/data/gifts/N.gif";
import gifImagenie from "src/data/gifts/Ñ.gif";
import gifImageO from "src/data/gifts/O.gif";
import gifImageP from "src/data/gifts/P.gif";
import gifImageQ from "src/data/gifts/Q.gif";
import gifImageR from "src/data/gifts/R.gif";
import gifImageS from "src/data/gifts/S.gif";
import gifImageT from "src/data/gifts/T.gif";
import gifImageU from "src/data/gifts/U.gif";
import gifImageV from "src/data/gifts/V.gif";
import gifImageW from "src/data/gifts/W.gif";
import gifImageX from "src/data/gifts/X.gif";
import gifImageY from "src/data/gifts/Y.gif";
import gifImageZ from "src/data/gifts/Z.gif";
import { selectedTabType } from "@/types/dataTypes";
import ImgDisplay from "./ImgComp";
import sendImages from "@/components/websocket/socket";

const giftsLessons1 = {
  A: gifImageA,
  B: gifImageB,
  C: gifImageC,
  D: gifImageD,
  E: gifImageE,
  F: gifImageF,
  G: gifImageG,
  H: gifImageH,
  I: gifImageI,
};
const giftsLessons2 = {
  A: gifImageJ,
  B: gifImageK,
  C: gifImageL,
  D: gifImageM,
  E: gifImageN,
  F: gifImagenie,
  G: gifImageO,
  H: gifImageP,
  I: gifImageQ,
};
const giftsLessons3 = {
  A: gifImageR,
  B: gifImageS,
  C: gifImageT,
  D: gifImageU,
  E: gifImageV,
  F: gifImageW,
  G: gifImageX,
  H: gifImageY,
  I: gifImageZ,
};

export default function Lessons({
  handleSelectTab,
}: {
  handleSelectTab: (value: selectedTabType) => void;
  WichEndPoint: number;
}) {
  const [isCameraOpen, setCameraOpen] = useState(false);
  const [isTryingToOpenCamera, setIsTryingToOpenCamera] = useState(false);
  const [isCameraAvailable, setIsCameraAvailable] = useState(false);
  const [currentGif, setCurrentGif] = useState("A");

  const videoRef = useRef<HTMLVideoElement>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let intervalId: NodeJS.Timeout;

  useEffect(() => {
    checkCameraAvailability();
  }, []);

  const checkCameraAvailability = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasCamera = devices.some((device) => device.kind === "videoinput");
      setIsCameraAvailable(hasCamera);
    } catch (error) {
      setIsCameraAvailable(false);
      console.error("Error checking camera availability:", error);
    }
  };

  const openWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraOpen(true);
      setIsTryingToOpenCamera(true);
      obtainfps(videoRef.current);
    } catch (error) {
      setIsTryingToOpenCamera(true);
      setIsCameraAvailable(false);
      console.error("Error opening webcam:", error);
    }
  };

  const obtainfps = (video: HTMLVideoElement | null) => {
    if (video) {
      intervalId = setInterval(() => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const context = canvas.getContext("2d");
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = canvas.toDataURL("image/jpeg");
          sendImages(imageData, 2);
        }
      }, 200);
    }
  };

  const closeWebcam = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraOpen(false);
    setIsTryingToOpenCamera(false);
  };

  const handleDialogClose = () => {
    setIsTryingToOpenCamera(false);
  };

  const handleNextGif = () => {
    const gifKeys = Object.keys(giftsLessons2);
    const currentGifIndex = gifKeys.indexOf(currentGif);
    const nextGifIndex = (currentGifIndex + 1) % gifKeys.length;
    setCurrentGif(gifKeys[nextGifIndex]);
  };

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
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <ImgDisplay gifImage={giftsLessons2[currentGif]} />
        <div className="divider divider-horizontal w-px h-full"></div>
        <div className="flex flex-col items-center mx-auto">
          <div className="grid bg-base-200 justify-center rounded-box overflow-hidden">
            <video
              id="video"
              ref={videoRef}
              autoPlay
              className="w-max h-max"
              style={{ transform: "scaleX(-1)" }}
            ></video>
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
        <button
          className="btn btn-primary w-44 h-10 rounded-md mt-3 flex items-center"
          onClick={handleNextGif}
        >
          Next Gif
        </button>
      </div>
    </div>
  );
}
