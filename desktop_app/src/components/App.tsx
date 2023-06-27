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
    </div>
  )
}

export default App
