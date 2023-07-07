export default function ImgDisplay(letter) {
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

  return (
    <div className="card bg-base-300 place-items-center justify-center overflow-hidden ">
      <img
        src={letter_gifList[letter.letter]}
        alt="GIF"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}
