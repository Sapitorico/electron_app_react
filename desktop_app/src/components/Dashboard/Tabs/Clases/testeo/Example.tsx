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
}

function processGiftSlides({
  buttonclicked,
  type,
}: Pick<ExampleProps, "buttonclicked" | "type">): Slide[] {
  const giftSlides1: Slide[] = [];
  let fst;
  let sec;
  let key: string;
  let str: string;

  if (buttonclicked.length === 1) {
    fst = 1;
    sec = 10;
  } else {
    fst = buttonclicked.charCodeAt(0);
    sec = buttonclicked.charCodeAt(1);
  }

  if (type === "image") {
    str = "jpg";
  } else str = "gif";

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
    const { buttonclicked, type, changeSlide, setChange } = this.props;
    const giftSlides1 = processGiftSlides({ buttonclicked, type });
    const slides: Slide[] = [...giftSlides1];

    return (
      <div className="w-[50%] h-[50%]">
        <VerticalCarousel
          slides={slides}
          offsetRadius={offsetRadius}
          showNavigation={showNavigation}
          changeSlide={changeSlide}
          setChange={setChange}
        />
      </div>
    );
  }
}

export default Example;
