// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState, useRef, useEffect } from "react";
import { buttype, dominantHandType, fullScreenType } from "@/types/dataTypes";
import { selectedTabType } from "@/types/dataTypes";
import sendImages from "@/components/websocket/socket";
import { setMessageCallback } from "@/components/websocket/socket";
import { socket } from "@/components/websocket/socket";
import Example from "src/components/Dashboard/Tabs/Clases/testeo/Example";
import Modal from "./modal";

export default function Lessons({
  handleSelectTab,
  WichEndPoint,
  setFullScreen,
  dominantHand,
  buttonclicked,
  jutsu,
}: {
  buttonclicked: buttype;
  handleSelectTab: (value: selectedTabType) => void;
  WichEndPoint: number;
  setFullScreen: (value: fullScreenType) => void;
  dominantHand: dominantHandType;
  jutsu: string;
}) {
  // Variables de estado
  const [currentStep, setCurrentStep] =
    buttonclicked === "1"
      ? useState("2")
      : buttonclicked === "JUTSU"
      ? useState("3")
      : useState("1");
  const [isCameraOpen, setCameraOpen] = useState(false); // Bandera para el estado de la cámara abierta
  const [isTryingToOpenCamera, setIsTryingToOpenCamera] = useState(false); // Bandera para intentar abrir la cámara
  const [isCameraAvailable, setIsCameraAvailable] = useState(false); // Bandera para la disponibilidad de la cámara
  const [currentkey, setCurrentkey] =
    buttonclicked === "JUTSU" ? useState("0") : useState(buttonclicked[0]); // Identificador del Key actual
  const [changeSlide, setChange] = useState("NO");

  // Referencia al elemento de video
  const videoRef = useRef<HTMLVideoElement>(null);
  // ID de intervalo para capturar fotogramas del flujo de video
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    checkCameraAvailability();
  }, []);

  // Verificar si la cámara está disponible
  const checkCameraAvailability = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasCamera = devices.some((device) => device.kind === "videoinput");
      setIsCameraAvailable(hasCamera);
    } catch (error) {
      setIsCameraAvailable(false);
      console.error(
        "Error al verificar la disponibilidad de la cámara:",
        error
      );
    }
  };

  // Abrir la webcam y comenzar a capturar fotogramas
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
      console.error("Error al abrir la webcam:", error);
    }
  };

  // Obtener fotogramas del flujo de video a un intervalo fijo
  const obtainfps = (video: HTMLVideoElement | null) => {
    if (video) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      let intervalId = setInterval(() => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const context = canvas.getContext("2d");
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = canvas.toDataURL("image/jpeg");
          sendImages(imageData, WichEndPoint, dominantHand);
        }
      }, 200);
    }
  };

  // Cerrar la webcam y detener la captura de fotogramas
  const closeWebcam = () => {
    for (let i = 0; i <= 100; i++) {
      clearInterval(i);
    }
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
    if (socket) {
      socket.close();
    }
  };

  // Cerrar el diálogo de la cámara
  const handleDialogClose = () => {
    setIsTryingToOpenCamera(false);
  };

  // Manejar el siguiente Slide
  const handleNextSlide = () => {
    if (buttonclicked !== "1" && buttonclicked !== "JUTSU") {
      let check = false;
      if (currentkey === "Ñ") {
        check = true;
        setCurrentkey("O");
      } else {
        const incrementedCharCode = currentkey.charCodeAt(0) + 1;
        const incrementedStr = String.fromCharCode(incrementedCharCode);
        setCurrentkey(incrementedStr);
      }
      if (currentkey === "N") {
        if (check !== true) {
          setCurrentkey("Ñ");
        }
      }
      if (currentkey === buttonclicked[1]) {
        setCurrentkey(buttonclicked[0]);
        if (currentStep === "1") {
          setChange("YES");
          setTimeout(() => {
            setCurrentStep("2");
          }, 400);
        } else if (currentStep === "2") {
          setChange("YES");
          setTimeout(() => {
            setCurrentStep("3");
          }, 400);
        } else if (currentStep === "3") {
          setChange("YES");
          setTimeout(() => {
            setCurrentStep("4");
            setTimeout(() => {
              handleclick();
            }, 250);
          }, 400);
        }
      } else setChange("YES");
    } else if (buttonclicked === "1") {
      let incremented = (parseInt(currentkey) + 1).toString();
      setCurrentkey(incremented);
      if (currentkey === "10" && currentStep === "2") {
        setCurrentkey(buttonclicked);
        setChange("YES");
        setTimeout(() => {
          setCurrentStep("3");
        }, 400);
      } else if (currentkey === "10" && currentStep === "3") {
        setCurrentkey(buttonclicked);
        setChange("YES");
        setTimeout(() => {
          setCurrentStep("4");
          setTimeout(() => {
            handleclick();
          }, 250);
        }, 400);
      } else setChange("YES");
    } else if (buttonclicked === "JUTSU") {
      let incremented = (parseInt(currentkey) + 1).toString();
      setCurrentkey(incremented);
      if (currentkey === "9") {
        setChange("YES");
        setTimeout(() => {
          setCurrentStep("4");
          setTimeout(() => {
            handleclick();
          }, 250);
        }, 400);
      } else setChange("YES");
    }
  };

  // Función de devolución de llamada para manejar mensajes entrantes desde el socket
  const getMessage = (message: string) => {
    console.log(message);
    if (currentStep === "1" && message === "Next") {
      handleNextSlide();
    } else if (
      buttonclicked === "JUTSU" &&
      jutsu[parseInt(currentkey)] === message
    ) {
      handleNextSlide();
    } else if (
      (currentStep === "2" || currentStep === "3") &&
      message === currentkey
    ) {
      handleNextSlide();
    }
  };

  useEffect(() => {
    setMessageCallback(getMessage);
  }, [currentkey, currentStep]);

  function handleclick() {
    closeWebcam();
    window.my_modal_4.showModal();
  }
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "s") {
        // Call your function here
        handleNextSlide();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentkey]);

  return (
    <div className="mainContainer flex flex-col h-screen mx-auto">
      <div className="flex items-center w-20">
        <button
          className="btn-primary w-44 h-10 rounded-md mt-3 flex items-center"
          onClick={() => {
            closeWebcam();
            buttonclicked !== "JUTSU"
              ? handleSelectTab("educacion")
              : handleSelectTab("practica");
            setFullScreen("no");
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
        {buttonclicked === "JUTSU" && currentStep === "3" && (
          <Example
            buttonclicked={buttonclicked}
            type={"Letter"}
            changeSlide={changeSlide}
            setChange={setChange}
            currentStep={currentStep}
            jutsu={jutsu}
          />
        )}
        {currentStep === "1" && (
          <Example
            buttonclicked={buttonclicked}
            type={"gifts"}
            changeSlide={changeSlide}
            setChange={setChange}
            currentStep={currentStep}
            jutsu={jutsu}
          />
        )}
        {currentStep === "2" && (
          <Example
            buttonclicked={buttonclicked}
            type={"image"}
            changeSlide={changeSlide}
            setChange={setChange}
            currentStep={currentStep}
            jutsu={jutsu}
          />
        )}
        {currentStep === "3" && buttonclicked !== "JUTSU" && (
          <Example
            buttonclicked={buttonclicked}
            type={"Letter"}
            changeSlide={changeSlide}
            setChange={setChange}
            currentStep={currentStep}
            jutsu={jutsu}
          />
        )}
        {currentStep === "4" && (
          <>
            <button className="btn hidden" onClick={() => handleclick()}>
              open modal
            </button>
            <Modal
              handleSelectTab={handleSelectTab}
              setFullScreen={setFullScreen}
              retur={buttonclicked === "JUTSU" ? "0" : "1"}
            />
          </>
        )}
        <div className="divider divider-horizontal w-px h-full"></div>
        <div className="flex flex-col items-center mx-auto">
          <canvas
            id="canvas"
            width="640"
            height="480"
            className="hidden"
          ></canvas>
          <div className="grid bg-base-200 justify-center rounded-box overflow-hidden">
            <video
              id="video"
              ref={videoRef}
              autoPlay
              className="w-max h-max"
              style={{ transform: "scaleX(-1)" }}
            ></video>
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
          onClick={handleNextSlide}
        >
          Next Gif
        </button>
      </div>
    </div>
  );
}
