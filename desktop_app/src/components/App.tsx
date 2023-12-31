import Dashboard from "./Dashboard/Dashboard";
import { selectedTabType } from "@/types/dataTypes";
import HomePage from "./Dashboard/Tabs/Home/HomePage";
import Education from "./Dashboard/Tabs/Education/Education";
import { useState } from "react";
import Glosario from "./Dashboard/Tabs/Glosario/Glosario";
import Clases from "./Dashboard/Tabs/Clases/Clases";
import Bubbles from "./bubbleAnimation";
import { dominantHandType } from "@/types/dataTypes";
import { fullScreenType } from "@/types/dataTypes";
import PracticeMenu from "./Dashboard/Tabs/Practice/Practice";
import { buttype } from "@/types/dataTypes";
import Write from "./Dashboard/Tabs/Practice/write";

function App() {
  const [selectedTab, setSelectedTab] = useState<selectedTabType>("home");
  const handleSelectTab = (value: selectedTabType) => {
    setSelectedTab(value);
  };
  const [buttonclicked, setbut] = useState<buttype>("AI");
  const [dominantHand, setDominantHand] = useState<dominantHandType>("Right");
  const [fullscreen, setFullScreen] = useState<fullScreenType>("no");
  const [jutsu, setjutsu] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex w-full h-screen bg-base-100 ">
      {fullscreen === "no" && (
        <div className="flex w-full h-screen bg-base-100 ">
          <Dashboard
            selectedTab={selectedTab}
            handleSelectTab={handleSelectTab}
            dominantHand={dominantHand}
            setDominantHand={setDominantHand}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />

          <div className="container h-full overflow-hidden mx-auto">
            <Bubbles />
            <div className="mainContainer justify-center items-center h-full">
              {selectedTab === "home" && <HomePage />}
              {selectedTab === "educacion" && (
                <Education
                  setbut={setbut}
                  handleSelectTab={handleSelectTab}
                  setFullScreen={setFullScreen}
                />
              )}
              {selectedTab === "practica" && (
                <PracticeMenu
                  handleSelectTab={handleSelectTab}
                  setFullScreen={setFullScreen}
                  setbut={setbut}
                  setjutsu={setjutsu}
                />
              )}
              {selectedTab === "glosario" && <Glosario />}
            </div>
            {selectedTab !== "home" && (
              <img
                src="src/data/image/Logo-HandSpeak.png"
                alt="Logo"
                className="logo absolute bottom-3 right-3 w-12 animate-spin mx-auto select-none homeImage transition-transform duration-500"
              />
            )}
          </div>
        </div>
      )}
      {fullscreen === "yes" && (
        <div className=" h-full overflow-hidden mx-auto">
          <Bubbles />
          <div className="mainContainer justify-center items-center h-full">
            {selectedTab === "clasesLetras" && (
              <Clases
                handleSelectTab={handleSelectTab}
                WichEndPoint={0}
                setFullScreen={setFullScreen}
                dominantHand={dominantHand}
                buttonclicked={buttonclicked}
                jutsu={jutsu}
              />
            )}
            {selectedTab === "clasesNumeros" && (
              <Clases
                handleSelectTab={handleSelectTab}
                WichEndPoint={1}
                setFullScreen={setFullScreen}
                dominantHand={dominantHand}
                buttonclicked={buttonclicked}
                jutsu={jutsu}
              />
            )}
            {selectedTab === "write" && (
              <Write
                handleSelectTab={handleSelectTab}
                WichEndPoint={2}
                setFullScreen={setFullScreen}
                dominantHand={dominantHand}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
