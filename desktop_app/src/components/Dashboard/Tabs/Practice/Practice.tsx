import { selectedTabType } from "@/types/dataTypes";
import { fullScreenType } from "@/types/dataTypes";

export default function PracticeMenu({
  handleSelectTab,
  setFullScreen,
}: {
  handleSelectTab: (value: selectedTabType) => void;
  setFullScreen: (value: fullScreenType) => void;
}) {
  return (
    <div className="flex-col space-y-10 my-28">
      <div className="card w-auto bg-base-200 shadow-2xl items-center mx-7 shadow-black">
        <div className="card-body">
          <h2 className="card-title justify-center">Práctica</h2>
          <p>
            theres a lady who's sure all that glitters is gold and she's buying
            a stariway to heaven tu ru tu. uhhhh uhhhh uhhhh it makes me wonder
            uuuauauauauau
          </p>
        </div>
      </div>
      <div className=" flex flex-row justify-center space-x-4 mx-7">
        <div className="card w-96 bg-base-200 shadow-2xl shadow-black ">
          <div className="card-body">
            <h2 className="card-title">Modo Jutsu</h2>
            <p>Pon a prueba lo aprendido interpretando letras a señas</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setFullScreen("yes");
                  handleSelectTab("clasesLetras");
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
