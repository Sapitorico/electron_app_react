import { useState } from 'react'
import { dominantHandType } from '@/types/dataTypes'
import { selectedTabType } from '@/types/dataTypes'


export default function Dashboard({ selectedTab, handleSelectTab }: { selectedTab: string, handleSelectTab: (value: selectedTabType) => void }) {
    const [dominantHand, setDominantHand] = useState<dominantHandType>("derecha")

    return (
        <div className='flex flex-col justify-between basis-1/6 h-full bg-base-200'>
            <div >
                <ul className='tabs tabs-boxed flex-col items-stretch drop-shadow-lg'>
                    <li
                        onClick={() => {
                            handleSelectTab("home")
                        }}
                    ><a href="#" className={`stat ${selectedTab === "home" ? "tab-active" : ""}`}>Home</a></li>
                    <li
                        onClick={() => {
                            handleSelectTab("educacion")
                        }}
                    ><a href="#" className={`stat ${selectedTab === "educacion" ? "tab-active" : ""}`}>Educación</a></li>
                    <li
                        onClick={() => {
                            handleSelectTab("practica")
                        }}
                    ><a href="#" className={`stat ${selectedTab === "practica" ? "tab-active" : ""}`}>Práctica</a></li>
                    <li
                        onClick={() => {
                            handleSelectTab("glosario")
                        }}
                    ><a href="#" className={`stat ${selectedTab === "glosario" ? "tab-active" : ""}`}>Glosario</a></li>
                </ul>
            </div>
            <div className='flex flex-col p-4 border-primary border-[1.5px] m-4 items-center gap-4 rounded-box'>
                <span>Mano dominante</span>
                <div className='btn-group'>
                    <button
                        className={`btn ${dominantHand === "izquierda" ? "btn-active" : ""}`}
                        onClick={() => {
                            setDominantHand("izquierda")
                        }}
                    >Izquierda</button>
                    <button
                        className={`btn ${dominantHand === "derecha" ? "btn-active" : ""}`}
                        onClick={() => {
                            setDominantHand("derecha")
                        }}
                    >Derecha</button>
                </div>

            </div>
        </div>
    )
}