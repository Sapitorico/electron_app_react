import { useState, useEffect } from "react";
import { dominantHandType } from "@/types/dataTypes";
import { selectedTabType } from "@/types/dataTypes";

export default function Dashboard({
  selectedTab,
  handleSelectTab,
  dominantHand,
  setDominantHand,
}: {
  selectedTab: string;
  handleSelectTab: (value: selectedTabType) => void;
  dominantHand: string;
  setDominantHand: (value: dominantHandType) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationStyle, setAnimationStyle] = useState({ top: 0 });

  useEffect(() => {
    const tabs = document.querySelectorAll(".tabs li");
    const {offsetTop: activeTabTop} = tabs[activeIndex];

    setAnimationStyle({ top: activeTabTop });
  }, [activeIndex]);

  const handleSelectTabWithAnimation = (
    tab: selectedTabType,
    index: number
  ) => {
    setActiveIndex(index);
    handleSelectTab(tab);
  };

  return (
    <div className="flex flex-col justify-between basis-1/8 h-full bg-base-200">
      <div>
        <ul className="tabs tabs-boxed flex-col items-stretch drop-shadow-lg">
          <li
            onClick={() => handleSelectTabWithAnimation("home", 0)}
            className={`stat ${
              selectedTab === "home"
                ? "dashTags flex items-center"
                : "flex items-center"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke={activeIndex === 0 ? "black" : "currentColor"}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className="w-6 h-6"
              style={{ marginRight: "0.5rem" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <a
              href="#"
              className={
                activeIndex === 0
                  ? "animate-color-transition text-xl font-semibold"
                  : "text-xl font-semibold"
              }
            >
              Home
            </a>
          </li>
          <li
            onClick={() => handleSelectTabWithAnimation("educacion", 1)}
            className={`stat ${
              selectedTab === "educacion" || selectedTab === "clases"
                ? "dashTags flex items-center"
                : "flex items-center text-xl font-semibold"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke={activeIndex === 1 ? "black" : "currentColor"}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className="w-6 h-6"
              style={{ marginRight: "0.5rem" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
              />
            </svg>

            <a
              href="#"
              className={
                activeIndex === 1
                  ? "animate-color-transition text-xl font-semibold"
                  : "text-xl font-semibold"
              }
            >
              Educación
            </a>
          </li>
          <li
            onClick={() => handleSelectTabWithAnimation("practica", 2)}
            className={`stat ${
              selectedTab === "practica"
                ? "dashTags flex items-center"
                : "flex items-center"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke={activeIndex === 2 ? "black" : "currentColor"}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className="w-6 h-6"
              style={{ marginRight: "0.5rem" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
              />
            </svg>
            <a
              href="#"
              className={
                activeIndex === 2
                  ? "text-xl animate-color-transition font-semibold"
                  : "text-xl font-semibold"
              }
            >
              Práctica
            </a>
          </li>
          <li
            onClick={() => handleSelectTabWithAnimation("glosario", 3)}
            className={`stat ${
              selectedTab === "glosario"
                ? "dashTags flex items-center"
                : "flex items-center"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke={activeIndex === 3 ? "black" : "currentColor"}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className="w-6 h-6"
              style={{ marginRight: "0.5rem" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>

            <a
              href="#"
              className={
                activeIndex === 3
                  ? "animate-color-transition text-xl font-semibold"
                  : "text-xl font-semibold"
              }
            >
              Glosario
            </a>
          </li>
          <div
            className="tab-indicator"
            style={{
              top: animationStyle.top,
              transition: "top 0.3s ease",
            }}
          />
        </ul>
      </div>
      <div className="flex flex-col p-4 border-primary border-[1.5px] m-4 items-center gap-4 rounded-box">
        <span>Mano dominante</span>
        <div className="btn-group">
          <button
            name="hand"
            value="Left"
            className={`btn ${
              dominantHand === "izquierda" ? "btn-active" : ""
            }`}
            onClick={() => {
              setDominantHand("izquierda");
            }}
          >
            Izquierda
          </button>

          <button
            name="hand"
            value="Right"
            className={`btn ${dominantHand === "derecha" ? "btn-active" : ""}`}
            onClick={() => {
              setDominantHand("derecha");
            }}
          >
            Derecha
          </button>
        </div>
      </div>
    </div>
  );
}
