import { whatRender } from "@/types/dataTypes";
import React, { useEffect, useState } from "react";
import { Spring, animated } from "react-spring";

// Componente de contenedor del slide
const SlideContainer = animated.div;

// Definir la interfaz para Slide
interface Slide {
  key: string;
  content: string;
}

// Definir la interfaz para VerticalCarouselProps
interface VerticalCarouselProps {
  slides: Slide[]; // Arreglo de objetos Slide
  showNavigation: boolean; // Booleano para mostrar o no la navegación
  offsetRadius: number; // Radio de desplazamiento
  changeSlide: string;
  setChange: (value: string) => void;
  currentStep: string;
}

const VerticalCarousel: React.FC<VerticalCarouselProps> = ({
  slides,
  showNavigation,
  offsetRadius,
  changeSlide,
  setChange,
  currentStep,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (changeSlide === "YES") {
      setTimeout(() => {
        moveSlide(1);
        setChange("NO");
      }, 250);
    }
  }, [changeSlide]);

  // useEffect(() => {
  // const currentIndex = slides.findIndex((slide) => slide.key === letter);
  // const currentOffsetFromMiddle = currentIndex - index;
  // if (currentIndex !== -1 && currentOffsetFromMiddle === 0) {
  //  const nextIndex = 1;
  // moveSlide(nextIndex);
  // }
  // }, [letter]);

  // Función para calcular el módulo del índice con respecto a la longitud de los slides
  const modBySlidesLength = (index: number): number => {
    return ((index % slides.length) + slides.length) % slides.length;
  };

  // Función para mover el slide en una dirección dada
  const moveSlide = (direction: number): void => {
    setIndex((prevIndex) => modBySlidesLength(prevIndex + direction));
  };

  // Función para acotar el radio de desplazamiento dentro de los límites válidos
  const clampOffsetRadius = (offsetRadius: number): number => {
    const upperBound = Math.floor((slides.length - 1) / 2);
    return Math.max(0, Math.min(offsetRadius, upperBound));
  };

  // Función para obtener los slides presentables según el índice actual y el radio de desplazamiento
  const getPresentableSlides = (): Slide[] => {
    const offset = clampOffsetRadius(offsetRadius);
    const presentableSlides: Slide[] = [];

    for (let i = -offset; i <= offset; i++) {
      presentableSlides.push(slides[modBySlidesLength(index + i)]);
    }

    return presentableSlides;
  };

  // Crear los botones de navegación si showNavigation es verdadero
  const navigationButtons = showNavigation ? (
    <div>
      <button className="btn" onClick={() => moveSlide(1)}>
        &#8593;
      </button>
      <button className="btn" onClick={() => moveSlide(-1)}>
        &#8595;
      </button>
    </div>
  ) : null;

  return (
    <>
      <div className="relative flex justify-center w-[100%] h-[100%]">
        {/* Renderizar los slides presentables */}
        {getPresentableSlides().map((slide, presentableIndex) => {
          // Calcula el desplazamiento desde el centro del slide
          const offsetFromMiddle = presentableIndex - offsetRadius;

          // Calcula el número total de elementos presentables en el slide
          const totalPresentables = 2 * offsetRadius + 1;

          // Calcula el factor de distancia basado en la posición del slide
          const distanceFactor = 1 - Math.abs(offsetFromMiddle / offsetRadius);

          // Calcula el desplazamiento vertical (translateY) del slide
          const translateYoffset =
            50 * (Math.abs(offsetFromMiddle) / (offsetRadius + 1));
          let translateY = -50;

          // Ajusta el desplazamiento vertical si el offsetRadius no es cero
          if (offsetRadius !== 0) {
            if (presentableIndex === 0) {
              translateY = 0;
            } else if (presentableIndex === totalPresentables - 1) {
              translateY = -50;
            }
          }

          // Aplica el desplazamiento vertical adicional según la posición del slide
          if (offsetFromMiddle > 0) {
            translateY += translateYoffset;
          } else if (offsetFromMiddle < 0) {
            translateY -= translateYoffset;
          }

          return (
            <Spring
              key={slide.key}
              to={{
                ...(currentStep === "2" || currentStep === "3"
                  ? {
                      width: changeSlide === "YES" ? "0%" : "100%",
                      transform: `translateX(0%) translateY(${translateY}%) scale(${distanceFactor})`,
                    }
                  : {
                      transform: `translateX(${
                        changeSlide === "YES" ? -200 : 0
                      }%) translateY(${translateY}%) scale(${distanceFactor})`,
                    }),

                top: `${
                  offsetRadius === 0
                    ? 50
                    : 50 + (offsetFromMiddle * 50) / offsetRadius
                }%`,
                opacity: offsetFromMiddle === 0 ? 1 : 0, // Establece opacidad en 1 para el elemento principal, 0 para los demás
              }}
            >
              {(style) => (
                <SlideContainer
                  // Clase del contenedor del slide
                  className="absolute h-[100%] top-[50%] flex items-center justify-center origin-[50%_50%]"
                  style={{
                    ...style,
                    zIndex: Math.abs(Math.abs(offsetFromMiddle) - 2),
                  }}
                >
                  <div
                    className={`flex relative drop-shadow-[2px_2px_10px_rgba(0,0,0,0.8)] rounded-[50%] ${
                      currentStep === "3" && changeSlide === "YES"
                        ? "bg-green-500"
                        : "bg-white"
                    } p-[14px] mr-[-45px] flex-shrink-0 items-center justify-center ${
                      currentStep === "3"
                        ? "text-[80px]  w-[150px] h-[150px]"
                        : "text-[50px]  w-[90px] h-[90px]"
                    } text-black ${
                      offsetFromMiddle === 0 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {/* Nombre del slide extraído del contenido */}
                    {offsetFromMiddle === 0
                      ? // Reproduce el GIF solo para el elemento principal que sea un GIF
                        slide.key
                      : // Muestra solo la imagen estática para los demás elementos o los elementos principales que no sean un GIF
                        ""}
                  </div>
                  {currentStep !== "3" && (
                    <div
                      className={
                        changeSlide === "YES" && currentStep === "2"
                          ? "w-[100%] bg-green-500 rounded-[8px] pt-[16px] pr-[20px] pb-[16px] pl-[20px] transition-transform duration-1000 ease-in-out"
                          : changeSlide === "YES" && currentStep === "1"
                          ? "w-[100%] bg-blue-500 rounded-[8px] pt-[16px] pr-[20px] pb-[16px] pl-[20px]"
                          : `w-[100%] bg-[white] rounded-[8px] pt-[16px] pr-[20px] pb-[16px] pl-[20px] ${
                              offsetFromMiddle === 0
                                ? "opacity-100"
                                : "opacity-0"
                            }`
                      }
                    >
                      {/* Imagen del slide */}
                      {offsetFromMiddle === 0 ? (
                        // Reproduce el GIF solo para el elemento principal que sea un GIF
                        <img
                          src={slide.content}
                          className="w-[100%] ml-auto mr-auto"
                          alt="Gift"
                        />
                      ) : (
                        // Muestra solo la imagen estática para los demás elementos o los elementos principales que no sean un GIF
                        <img src={""} alt="" />
                      )}
                    </div>
                  )}

                  {/*<div className="flex relative drop-shadow-[2px_2px_10px_rgba(0,0,0,0.8)] rounded-[50%] bg-white w-[90px] h-[90px] p-[14px] mr-[-45px] flex-shrink-0 items-center justify-center text-[50px] text-black">*/}
                  {/*  /!* Nombre del slide extraído del contenido *!/*/}
                  {/*  {slide.key}*/}
                  {/*</div>*/}
                  {/*<div className="w-[50%] bg-white rounded-[8px] pt-[16px] pr-[20px] pb-[16px] pl-[20px]">*/}
                  {/*  /!* Imagen del slide *!/*/}
                  {/*  <img src={slide.content} className="w-[100%] ml-auto mr-auto" alt="Slide A" />*/}
                  {/*</div>*/}
                </SlideContainer>
              )}
            </Spring>
          );
        })}
      </div>
      {navigationButtons}
    </>
  );
};

export default VerticalCarousel;
