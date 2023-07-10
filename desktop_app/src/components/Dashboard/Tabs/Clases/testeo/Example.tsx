// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { Component } from "react";
import VerticalCarousel from "./vertical";

interface Slide {
  key: string;
  content: string;
}

const giftSlides1 : Slide[] = [
  {
    key: "A",
    content: "src/data/gifts/A.gif",
  },
  {
    key: "B",
    content: "src/data/gifts/B.gif",
  },
  {
    key: "C",
    content: "src/data/gifts/C.gif",
  },
  {
    key: "D",
    content: "src/data/gifts/D.gif",
  },
  {
    key: "E",
    content: "src/data/gifts/E.gif",
  },
  {
    key: "F",
    content: "src/data/gifts/F.gif",
  },
  {
    key: "G",
    content: "src/data/gifts/G.gif",
  },
  {
    key: "H",
    content: "src/data/gifts/H.gif",
  },
  {
    key: "I",
    content: "src/data/gifts/I.gif",
  },
      {
    key: "A",
    content: "src/data/image/A.jpg",
  },
  {
    key: "B",
    content: "src/data/image/B.jpg",
  },
  {
    key: "C",
    content: "src/data/image/C.jpg",
  },
  {
    key: "D",
    content: "src/data/image/D.jpg",
  },
  {
    key: "E",
    content: "src/data/image/E.jpg",
  },
  {
    key: "F",
    content: "src/data/image/F.jpg",
  },
  {
    key: "G",
    content: "src/data/image/G.jpg",
  },
  {
    key: "H",
    content: "src/data/image/H.jpg",
  },
  {
    key: "I",
    content: "src/data/image/I.jpg",
  },
];

// const imageSlides: Slide[] = [
//   {
//     key: "A",
//     content: "src/data/image/A.jpg",
//   },
//   {
//     key: "B",
//     content: "src/data/image/B.jpg",
//   },
//   {
//     key: "C",
//     content: "src/data/image/C.jpg",
//   },
//   {
//     key: "D",
//     content: "src/data/image/D.jpg",
//   },
//   {
//     key: "E",
//     content: "src/data/image/E.jpg",
//   },
//   {
//     key: "F",
//     content: "src/data/image/F.jpg",
//   },
//   {
//     key: "G",
//     content: "src/data/image/G.jpg",
//   },
//   {
//     key: "H",
//     content: "src/data/image/H.jpg",
//   },
//   {
//     key: "I",
//     content: "src/data/image/I.jpg",
//   },
// ];

const slides1: Slide[] = [...giftSlides1];

interface ExampleProps {
  message: string;
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
    const { message } = this.props;

    return (
      <div className="w-[50%] h-[50%]">
        <VerticalCarousel
          slides={slides1}
          offsetRadius={offsetRadius}
          showNavigation={showNavigation}
          letter={message}
        />
      </div>
    );
  }
}

export default Example;

