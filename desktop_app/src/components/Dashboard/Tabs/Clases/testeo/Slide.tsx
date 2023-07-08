// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from "react";
import { Spring, animated } from "react-spring";

// Componente de contenedor del slide
const SlideContainer = animated.div;

// Componente de Slide
function Slide({ content, offsetRadius, index, animationConfig}) {
  const offsetFromMiddle = index - offsetRadius;
  const totalPresentables = 2 * offsetRadius + 1;
  const distanceFactor = 1 - Math.abs(offsetFromMiddle / offsetRadius);
  const translateYoffset = 50 * (Math.abs(offsetFromMiddle) / (offsetRadius + 1));
  let translateY = -50;

  if (offsetRadius !== 0) {
    if (index === 0) {
      translateY = 0;
    } else if (index === totalPresentables - 1) {
      translateY = -100;
    }
  }

  if (offsetFromMiddle > 0) {
    translateY += translateYoffset;
  } else if (offsetFromMiddle < 0) {
    translateY -= translateYoffset;
  }

  return (
    <Spring
      to={{
        transform: `translateX(0%) translateY(${translateY}%) scale(${distanceFactor})`,
        top: `${
          offsetRadius === 0 ? 50 : 50 + (offsetFromMiddle * 50) / offsetRadius
        }%`,
        opacity: distanceFactor * distanceFactor,
      }}
      config={animationConfig}
    >
      {(style) => (
        <SlideContainer
          className="absolute h-[100%] top-[50%] flex items-center justify-center origin-[50%_50%]"
          style={{
            ...style,
            zIndex: Math.abs(Math.abs(offsetFromMiddle) - 2),
          }}
        >
          <div className="flex relative drop-shadow-[2px_2px_10px_rgba(0,0,0,0.8)] rounded-[50%] bg-white w-[90px] h-[90px] p-[14px] mr-[-45px] flex-shrink-0 items-center justify-center text-[50px] text-black">
            {content.key}
          </div>
          <div className="w-[50%] bg-white rounded-[8px] pt-[16px] pr-[20px] pb-[16px] pl-[20px]">
            {content}
          </div>
        </SlideContainer>
      )}
    </Spring>
  );
}

export default Slide;


