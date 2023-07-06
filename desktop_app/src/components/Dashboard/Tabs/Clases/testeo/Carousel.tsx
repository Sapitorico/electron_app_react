import React from 'react';
import "./style.css";
import A from "src/data/image/A.jpg";
import B from "src/data/image/B.jpg";
import C from "src/data/image/C.jpg";
import D from "src/data/image/D.jpg";
import E from "src/data/image/E.jpg";
import F from "src/data/image/F.jpg";
import G from "src/data/image/G.jpg";
import H from "src/data/image/H.jpg";
import I from "src/data/image/I.jpg";

const letters = [
  ["A", A],
  ["B", B],
  ["C", C],
  ["D", D],
  ["E", E],
  ["F", F],
  ["G", G],
  ["H", H],
  ["I", I],
];

const Carousel = () => {
  return (
    <div className="w-screen flex justify-center">
      <div className="relative w-full max-w-500 mx-auto flex justify-center flex-col">
        {letters.map((item, index) => (
          <div
            className="carousel__item flex items-center absolute w-full px-12 opacity-0 filter will-change-transform"
            style={{ animationDelay: `calc(3s * ${index - 1})` }}
            key={index}
          >
            <div className="carousel__item-head">
              {item[0]}
            </div>
            <div className="carousel__item-body">
              <img src={item[1]} className="letter_image" alt="letters" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

