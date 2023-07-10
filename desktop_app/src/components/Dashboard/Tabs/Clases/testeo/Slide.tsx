import React from "react";
import { Spring, animated } from "react-spring";

// Componente de contenedor del slide
const SlideContainer = animated.div;

// Componente de Slide
function Slide({ slideKey, content, offsetRadius, index }) {
  // Calcula el desplazamiento desde el centro del slide
  const offsetFromMiddle = index - offsetRadius;

  // Calcula el número total de elementos presentables en el slide
  const totalPresentables = 2 * offsetRadius + 1;

  // Calcula el factor de distancia basado en la posición del slide
  const distanceFactor = 1 - Math.abs(offsetFromMiddle / offsetRadius);

  // Calcula el desplazamiento vertical (translateY) del slide
  const translateYoffset = 50 * (Math.abs(offsetFromMiddle) / (offsetRadius + 1));
  let translateY = -50;

  // Ajusta el desplazamiento vertical si el offsetRadius no es cero
  if (offsetRadius !== 0) {
    if (index === 0) {
      translateY = 0;
    } else if (index === totalPresentables - 1) {
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
      to={{
        transform: `translateX(0%) translateY(${translateY}%) scale(${distanceFactor})`,
        top: `${offsetRadius === 0 ? 50 : 50 + (offsetFromMiddle * 50) / offsetRadius}%`,
        opacity: distanceFactor * distanceFactor,
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
          <div className="flex relative drop-shadow-[2px_2px_10px_rgba(0,0,0,0.8)] rounded-[50%] bg-white w-[90px] h-[90px] p-[14px] mr-[-45px] flex-shrink-0 items-center justify-center text-[50px] text-black">
            {/* Nombre del slide extraído del contenido */}
            {slideKey}
          </div>
          <div className="w-[50%] bg-white rounded-[8px] pt-[16px] pr-[20px] pb-[16px] pl-[20px]">
            {/* Imagen del slide */}
            <img src={content} className="w-[100%] ml-auto mr-auto" alt="Slide A"/>
          </div>
        </SlideContainer>
      )}
    </Spring>
  );
}

export default Slide;
