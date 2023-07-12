// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from "react";

const number_gifList = {
  "1": "/src/data/img/1.jpg",
  "2": "/src/data/img/2.jpg",
  "3": "/src/data/img/3.jpg",
  "4": "/src/data/img/4.jpg",
  "5": "/src/data/img/5.jpg",
  "6": "/src/data/img/6.jpg",
  "7": "/src/data/img/7.jpg",
  "8": "/src/data/img/8.jpg",
  "9": "/src/data/img/9.jpg",
  "10": "/src/data/img/10.jpg",
};

const letter_gifList = {
  A: "/src/data/gifts/A.gif",
  B: "/src/data/gifts/B.gif",
  C: "/src/data/gifts/C.gif",
  D: "/src/data/gifts/D.gif",
  E: "/src/data/gifts/E.gif",
  F: "/src/data/gifts/F.gif",
  G: "/src/data/gifts/G.gif",
  H: "/src/data/gifts/H.gif",
  I: "/src/data/gifts/I.gif",
  J: "/src/data/gifts/J.gif",
  K: "/src/data/gifts/K.gif",
  L: "/src/data/gifts/L.gif",
  M: "/src/data/gifts/M.gif",
  N: "/src/data/gifts/N.gif",
  Ñ: "/src/data/gifts/Ñ.gif",
  O: "/src/data/gifts/O.gif",
  P: "/src/data/gifts/P.gif",
  Q: "/src/data/gifts/Q.gif",
  R: "/src/data/gifts/R.gif",
  S: "/src/data/gifts/S.gif",
  T: "/src/data/gifts/T.gif",
  U: "/src/data/gifts/U.gif",
  V: "/src/data/gifts/V.gif",
  W: "/src/data/gifts/W.gif",
  X: "/src/data/gifts/X.gif",
  Y: "/src/data/gifts/Y.gif",
  Z: "/src/data/gifts/Z.gif",
};

const alphabet_arr = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "Ñ",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const number_arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export default function Glossary() {
  const [selectedDialog, setSelectedDialog] = useState(null);

  const openDialog = (index, type) => {
    setSelectedDialog({ index, type });
  };

  const closeDialog = () => {
    setSelectedDialog(null);
  };

  const renderDialog = () => {
    if (!selectedDialog) return null;

    const { index, type } = selectedDialog;
    const gifList = type === "letter" ? letter_gifList : number_gifList;
    const item = type === "letter" ? alphabet_arr[index] : number_arr[index];

    return (
      <dialog open={true} onClose={closeDialog} className="modal">
        <form method="dialog" className="modal-box">
          <div className="grid-cols-4">
            <img
              src={gifList[item]}
              alt={`GIF de ${item}`}
              className="mx-auto rounded-lg col-span-2 max-w-xs"
            />
          </div>
          <div className="modal-action">
            <button
              className="btn btn-warning mx-auto text-base"
              onClick={closeDialog}
            >
              Cerrar
            </button>
          </div>
        </form>
      </dialog>
    );
  };

  return (
    <div className="relative flex h-screen overflow-y-auto">
      <div>
        <h1 className="m-5 text-2xl font-bold">Alfabeto</h1>
        <div className="flex flex-wrap gap-5 m-5">
          {alphabet_arr.map((letter, index) => (
            <div className="card">
              <button
                className="glosaryCard card card-body  shadow-2xl text-4xl font-semibold"
                onClick={() => openDialog(index, "letter")}
              >
                {letter}
              </button>
            </div>
          ))}
        </div>
        <h1 className="m-5 text-2xl font-bold">Números</h1>
        <div className="flex flex-wrap gap-5 m-5">
          {number_arr.map((number, index) => (
            <div className="glosaryCardBody card">
              <button
                className="glosaryCard card card-body shadow-xl text-4xl font-semibold"
                onClick={() => openDialog(index, "number")}
              >
                {number}
              </button>
            </div>
          ))}
        </div>
      </div>
      {renderDialog()}
    </div>
  );
}
