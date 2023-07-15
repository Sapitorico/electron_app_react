import { selectedTabType } from "@/types/dataTypes";
import { fullScreenType } from "@/types/dataTypes";
import { buttype } from "@/types/dataTypes";

export default function PracticeMenu({
  handleSelectTab,
  setFullScreen,
  setbut,
  setjutsu,
}: {
  handleSelectTab: (value: selectedTabType) => void;
  setFullScreen: (value: fullScreenType) => void;
  setbut: (value:buttype ) => void;
  setjutsu: (value:string ) => void;
}) {
  function generateRandomArray(length: number) {
    const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    const randomArray = new Set<string>();
  
    while (randomArray.size < length) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      const letter = letters[randomIndex];
      randomArray.add(letter);
    }
    return Array.from(randomArray);
  }

  function handleclick() {
    let random = generateRandomArray(10).join("");
    setbut("JUTSU")
    setjutsu(random)
  }
  return (
    <div className="flex-col space-y-10 my-28">
      <div className="card w-auto bg-base-200 shadow-2xl items-center mx-7 shadow-black">
        <div className="card-body">
          <h2 className="card-title justify-center">Práctica</h2>
          <p>
          ¡Demuestra tu destreza y conocimiento adquirido, explora diferentes modos para fortalecer tu comunicación y expresión.
          </p>
        </div>
      </div>
      <div className=" flex flex-row justify-center space-x-4 mx-7">
        <div className="card w-96 bg-base-200 shadow-2xl shadow-black ">
          <div className="card-body">
            <h2 className="card-title">Modo Aleatorio</h2>
            <p>Pon a prueba tus habilidades interpretando señas de forma aleatoria.</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleclick()
                  setFullScreen("yes");
                  handleSelectTab("clasesLetras");
                  handleclick()
                }}
              >
                Jugar
              </button>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-200 shadow-2xl shadow-black">
          <div className="card-body">
            <h2 className="card-title">Modo Texto</h2>
            <p>Escribe tu propia historia no lineal con señas</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Escribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
