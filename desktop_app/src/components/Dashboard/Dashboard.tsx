import { useState, useEffect } from 'react';
import { dominantHandType } from "@/types/dataTypes";
import { selectedTabType } from "@/types/dataTypes";

export default function Dashboard({
  selectedTab,
  handleSelectTab,
}: {
  selectedTab: string;
  handleSelectTab: (value: selectedTabType) => void;
}) {
  const [dominantHand, setDominantHand] = useState<dominantHandType>('derecha');
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationStyle, setAnimationStyle] = useState({ top: 0 });

  useEffect(() => {
    const tabs = document.querySelectorAll('.tabs li');
    const activeTab = tabs[activeIndex];
    const activeTabTop = activeTab.offsetTop;

    setAnimationStyle({ top: activeTabTop });
  }, [activeIndex]);

  const handleSelectTabWithAnimation = (tab: selectedTabType, index: number) => {
    setActiveIndex(index);
    handleSelectTab(tab);
  };

  return (
    <div className="flex flex-col justify-between basis-1/6 h-full bg-base-200">
      <div>
        <ul className="tabs tabs-boxed flex-col items-stretch drop-shadow-lg">
          <li
            onClick={() => handleSelectTabWithAnimation('home', 0)}
            className={`stat ${selectedTab === 'home' ? 'dashTags flex items-center' : 'flex items-center'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" className="w-6 h-6 stroke-white animate-color-transition">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <a href="#" className={activeIndex === 0 ? 'animate-color-transition text-xl font-semibold' : 'text-xl font-semibold'}>
              Home
            </a>
          </li>
          <li
            onClick={() => handleSelectTabWithAnimation('educacion', 1)}
            className={`stat ${selectedTab === 'educacion' || selectedTab === 'clases' ? 'dashTags text-xl font-semibold' : 'text-xl font-semibold'
              }`}
          >
            <a href="#" className={activeIndex === 1 ? 'animate-color-transition text-xl font-semibold' : 'text-xl font-semibold'}>
              Educación
            </a>
          </li>
          <li
            onClick={() => handleSelectTabWithAnimation('practica', 2)}
            className={`stat ${selectedTab === 'practica' ? 'dashTags' : ''}`}
          >
            <a href="#" className={activeIndex === 2 ? 'text-xl animate-color-transition font-semibold' : 'text-xl font-semibold'}>
              Práctica
            </a>
          </li>
          <li
            onClick={() => handleSelectTabWithAnimation('glosario', 3)}
            className={`stat ${selectedTab === 'glosario' ? 'dashTags' : ''}`}
          >
            <a href="#" className={activeIndex === 3 ? 'animate-color-transition text-xl font-semibold' : 'text-xl font-semibold'}>
              Glosario
            </a>
          </li>
          <div
            className="tab-indicator"
            style={{
              top: animationStyle.top,
              transition: 'top 0.3s ease',
            }}
          />
        </ul>
      </div>
      <div className="flex flex-col p-4 border-primary border-[1.5px] m-4 items-center gap-4 rounded-box">
        <span>Mano dominante</span>
        <div className="btn-group">
          <button
            className={`btn ${dominantHand === "izquierda" ? "btn-active" : ""
              }`}
            onClick={() => {
              setDominantHand("izquierda");
            }}
          >
            Izquierda
          </button>
          <button
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
