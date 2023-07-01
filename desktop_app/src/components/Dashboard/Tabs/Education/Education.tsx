import { selectedTabType } from "@/types/dataTypes";

export default function Education({
  handleSelectTab,
}: {
  handleSelectTab: (value: selectedTabType) => void;
}) {
  return (
    <div className=" mainContainer flex h-full w-ful justify-center">
      <div className="flex p-16 gap-11">
        <div className="card bg-base-100 justify-center shadow-2xl shadow-black">
          <div className="card-body grow-0">
            <div className="space-y-10 ">
              <div className="space-y-3">
                <h2 className="card-title justify-center select-none">
                  ABECEDARIO
                </h2>

                <div className="card-actions flex-col justify-center gap-10">
                  <button
                    onClick={() => {
                      handleSelectTab("clases");
                    }}
                    className="btn btn-primary w-96 font-bold text-xl"
                  >
                    A - I
                  </button>
                  <button className="btn btn-primary w-96 font-bold text-xl">
                    J - Q
                  </button>
                  <button className="btn btn-primary w-96 font-bold text-xl">
                    R - z
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <h2 className="card-title justify-center select-none">
                  NÚMEROS
                </h2>
                <div className="card-actions flex-col justify-center gap-10">
                  <button className="btn btn-primary w-96 font-bold text-xl">
                    0 - 10
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
