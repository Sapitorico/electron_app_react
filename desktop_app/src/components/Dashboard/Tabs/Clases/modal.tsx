import { selectedTabType } from "@/types/dataTypes";
import { fullScreenType } from "@/types/dataTypes";

export default function Modal({
  setFullScreen,
  handleSelectTab,
  retur,
}: {
  handleSelectTab: (value: selectedTabType) => void;
  setFullScreen: (value: fullScreenType) => void;
  retur: string;
}) {
  return (
    <div>
      <dialog id="my_modal_4" className="modal">
        <form method="dialog" className="modal-box w-1/4 max-w-5xl">
          <h3 className="font-bold text-lg text-white">¡Buen Trabajo!</h3>
          <p className="py-4 justify-center text-white">
            Leccion Completada ¡Bien Hecho!{" "}
          </p>
          <div className="modal-action flex justify-between">
            {/* if there is a button, it will close the modal */}
            <button className="btn btn-primary ">
              <svg
                fill="#000000"
                height="116px"
                width="116px"
                viewBox="-63.64 -63.64 616.81 616.81"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 justify-center"
              >
                <path
                  stroke="#ffffff"
                  strokeWidth="8"
                  d="M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7-210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9 l-118.6,87.1c-2,1.5-2,4.4,0,5.9l118.6,87.1c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6 c-5.1,76.9-67.8,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3-14.3-14.8-24.7-29.2-24.7c-17.9,0-31.9,15.9-29.1,33.6 C49.575,418.961,150.875,501.261,268.175,488.161z"
                />
              </svg>
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                retur === "1"
                  ? handleSelectTab("educacion")
                  : handleSelectTab("practica"),
                  setFullScreen("no");
              }}
            >
              Continuar
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
