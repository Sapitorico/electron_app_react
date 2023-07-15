// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { Component } from "react";
import VerticalCarousel from "./vertical";
import { whatRender } from "@/types/dataTypes";
import { buttype } from "@/types/dataTypes";

interface Slide {
  key: string;
  content: string;
}

interface ExampleProps {
  buttonclicked: buttype;
  type: whatRender;
  changeSlide: string;
  setChange: (value: string) => void;
  currentStep: string;
  className?: string;
  jutsu?:string
}

function processGiftSlides({
  buttonclicked,
  type,
  jutsu
}: Pick<ExampleProps, "buttonclicked" | "type" | "jutsu">): Slide[] {
  const giftSlides1: Slide[] = [];
  let fst;
  let sec;
  let key: string;
   


  if (buttonclicked === "JUTSU") {
    console.log(jutsu)
    console.log(" if jutsu HOLA")
    for (let i = 0; i <= 9; i++) {
      giftSlides1.push({ key: jutsu[i], content: "/src" });
    }
    return giftSlides1;
  }

  if (buttonclicked.length === 1) {
    fst = 1;
    sec = 10;
  } else {
    fst = buttonclicked.charCodeAt(0);
    sec = buttonclicked.charCodeAt(1);
  }

  let str = type === "image" ? "jpg" : type === "gifts" ? "gif" : "Letter";

  for (let i = fst; i <= sec; i++) {
    if (buttonclicked.length === 1) {
      key = i.toString();
    } else key = String.fromCharCode(i);

    giftSlides1.push({ key: key, content: `/src/data/${type}/${key}.${str}` });
  }

  if (buttonclicked === "JQ") {
    giftSlides1.splice(5, 0, {
      key: "Ñ",
      content: `/src/data/${type}/Ñ.${str}`,
    });
  }

  return giftSlides1;
}

interface ExampleState {
  offsetRadius: number;
  showNavigation: boolean;
}

class Example extends Component<ExampleProps, ExampleState> {
  state: ExampleState = {
    offsetRadius: 2,
    showNavigation: true,
  };
  render() {
    const { offsetRadius, showNavigation } = this.state;
    const {
      buttonclicked,
      type,
      changeSlide,
      setChange,
      currentStep,
      className,
      jutsu
    } = this.props;
    const giftSlides1 = processGiftSlides({ buttonclicked, type, jutsu });
    const slides: Slide[] = [...giftSlides1];

    return (
      <div className={`w-[50%] h-[50%] ${className}`}>
        <VerticalCarousel
          slides={slides}
          offsetRadius={offsetRadius}
          showNavigation={showNavigation}
          changeSlide={changeSlide}
          setChange={setChange}
          currentStep={currentStep}
        />
      </div>
    );
  }
}

export default Example;
