import Dashboard from './Dashboard/Dashboard'
import { selectedTabType } from '@/types/dataTypes'
import HomePage from './Dashboard/Tabs/Home/HomePage'
import Education from './Dashboard/Tabs/Education/Education'
import Practice from './Dashboard/Tabs/Practice/Practice'
import { useState } from 'react'
import Glosario from './Dashboard/Tabs/Glosario/Glosario'

function App() {

  const [selectedTab, setSelectedTab] = useState<selectedTabType>("home")

  const handleSelectTab = (value: selectedTabType) => {
    setSelectedTab(value)
  }

  return (
    <div className='flex w-full h-screen bg-base-100 '>
      <Dashboard selectedTab={selectedTab} handleSelectTab={handleSelectTab} />
      <div className='flex-1'>
        {selectedTab === "home" && <HomePage />}
        {selectedTab === "educacion" && <Education />}
        {selectedTab === "practica" && <Practice />}
        {selectedTab === "glosario" && <Glosario />}
      </div>
      {/*<div className="containerr">*/}
      {/*<div className="bubbles">*/}
      {/*  <span style={{'--i':11}}></span>*/}
      {/*  <span style={{'--i':12}}></span>*/}
      {/*  <span style={{'--i':24}}></span>*/}
      {/*  <span style={{'--i':10}}></span>*/}
      {/*  <span style={{'--i':14}}></span>*/}
      {/*  <span style={{'--i':23}}></span>*/}
      {/*  <span style={{'--i':18}}></span>*/}
      {/*  <span style={{'--i':16}}></span>*/}
      {/*  <span style={{'--i':20}}></span>*/}
      {/*  <span style={{'--i':22}}></span>*/}
      {/*  <span style={{'--i':27}}></span>*/}
      {/*  <span style={{'--i':18}}></span>*/}
      {/*  <span style={{'--i':21}}></span>*/}
      {/*  <span style={{'--i':15}}></span>*/}
      {/*  <span style={{'--i':25}}></span>*/}
      {/*  <span style={{'--i':19}}></span>*/}
      {/*  <span style={{'--i':13}}></span>*/}
      {/*  <span style={{'--i':28}}></span>*/}
      {/*  <span style={{'--i':10}}></span>*/}
      {/*  <span style={{'--i':14}}></span>*/}
      {/*  <span style={{'--i':27}}></span>*/}
      {/*  <span style={{'--i':11}}></span>*/}
      {/*</div>*/}
      {/*</div>*/}
    </div>
  )
}

export default App
