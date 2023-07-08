import React, { Component } from "react";
import VerticalCarousel from "./vertical";
import { config } from "react-spring";

interface Slide {
  key: string;
  content: React.ReactNode;
}

const slides: Slide[] = [
  {
    key: "A",
    content: <img src="src/data/image/A.jpg" className="w-[100%] ml-auto mr-auto" alt="Slide A" key="A"/>,
  },
  {
    key: "B",
    content: <img src="src/data/image/B.jpg" className="w-[100%] ml-auto mr-auto" alt="Slide B" key="B"/>,
  },
  {
    key: "C",
    content: <img src="src/data/image/C.jpg" className="w-[100%] ml-auto mr-auto" alt="Slide C" key="C"/>,
  },
  {
    key: "D",
    content: <img src="src/data/image/D.jpg" className="w-[100%] ml-auto mr-auto" alt="Slide D" key="D"/>,
  },
  {
    key: "E",
    content: <img src="src/data/image/E.jpg" className="w-[100%] ml-auto mr-auto" alt="Slide E" key="E"/>,
  },
  {
    key: "F",
    content: <img src="src/data/image/F.jpg" className="w-[100%] ml-auto mr-auto" alt="Slide F" key="F"/>,
  },
  {
    key: "G",
    content: <img src="src/data/image/G.jpg" className="w-[100%] ml-auto mr-auto" alt="Slide G" key="G"/>,
  },
  {
    key: "H",
    content: <img src="src/data/image/H.jpg" className="w-[100%] ml-auto mr-auto" alt="Slide H" key="H"/>,
  },
  {
    key: "I",
    content: <img src="src/data/image/I.jpg" className="w-[100%] ml-auto mr-auto" alt="Slide I" key="I"/>,
  },
];

interface ExampleState {
  offsetRadius: number;
  showNavigation: boolean;
  config: any;
}

export default class Example extends Component<{}, ExampleState> {
  state: ExampleState = {
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle,
  };

  render() {
    return (
      <div className="w-[50%] h-[50%] m-auto">
        <VerticalCarousel
          slides={slides}
          offsetRadius={this.state.offsetRadius}
          showNavigation={this.state.showNavigation}
          animationConfig={this.state.config}
        />
      </div>
    );
  }
}

