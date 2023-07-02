// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useRef, useState } from "react";

export default function Progress() {
  const [progress, setProgress] = useState(0);

  const increaseProgress = () => {
    if (progress < 33) {
      setProgress((prevProgress) => Math.min(prevProgress + 4, 33));
    } else if (progress >= 33 && progress < 66) {
      setProgress((prevProgress) => Math.min(prevProgress + 13, 66));
    } else if (progress >= 66 && progress < 100) {
      setProgress((prevProgress) => Math.min(prevProgress + 4, 100));
    }
  };

  const decreaseProgress = () => {
    if (progress <= 33 && progress > 0) {
      setProgress((prevProgress) => Math.max(prevProgress - 4, 0));
    } else if (progress > 33 && progress <= 66) {
      setProgress((prevProgress) => Math.max(prevProgress - 13, 33));
    } else if (progress > 66 && progress <= 100) {
      setProgress((prevProgress) => Math.max(prevProgress - 4, 66));
    }
  };

  const getProgressBarWidth = ({index}: { index: any }) => {
    if (index === 0) {
      return progress >= 33 ? "100%" : `${(progress / 33) * 100}%`;
    } else if (index === 1) {
      return progress >= 66 ? "100%" : progress >= 33 ? `${((progress - 33) / 33) * 100}%` : "0";
    } else if (index === 2) {
      return progress >= 100 ? "100%" : progress >= 66 ? `${((progress - 66) / 34) * 100}%` : "0";
    }
    return "0";
  };

  const getProgressBarGradient = ({index}: { index: any }) => {
    const greenColor = "#1de9b6";
    const grayColor = "#E5E7EB";
    const width = getProgressBarWidth({index: index});
    const gradient = `linear-gradient(to right, ${greenColor} ${width}, ${grayColor} ${width})`;
    return gradient;
  };

  return (
      <div className="w-full">
          <div className="divider"></div>
          <div className="w-full mx-auto">
            <div className="flex justify-between items-center pb-2 flex-col">
              <p className="text-xs text-green-400 font-bold">{`${progress}% Complete`}</p>
            </div>
            <div className="flex items-center">
              <div
                className={`w-1/3 h-1 rounded-tl rounded-bl mr-1`}
                style={{
                  backgroundImage: getProgressBarGradient({index: 0}),
                }}
              ></div>
              <div
                className={`w-1/3 h-1 mr-1 relative`}
                style={{
                  backgroundImage: getProgressBarGradient({index: 1}),
                }}
              >
                <div
                  className="h-1"
                  style={{
                    backgroundImage: getProgressBarGradient({index: 1}),
                    width: getProgressBarWidth({index: 1}),
                  }}
                ></div>
              </div>
              <div
                className={`w-1/3 h-1 rounded-tr rounded-br`}
                style={{
                  backgroundImage: getProgressBarGradient({index: 2}),
                }}
              ></div>
            </div>
            <div className="mt-2 flex justify-center">
              <button
                className="btn btn-primary mr-2"
                onClick={increaseProgress}
                disabled={progress >= 100}
              >
                Aumentar
              </button>
              <button
                className="btn btn-primary"
                onClick={decreaseProgress}
                disabled={progress <= 0}
              >
                Disminuir
              </button>
            </div>
          </div>
      </div>
  );
}

