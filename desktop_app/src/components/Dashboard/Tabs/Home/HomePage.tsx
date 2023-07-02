export default function HomePage() {
    return (
        <div className="container h-full overflow-hidden mx-auto">
            <div className='mainContainer p-4 flex justify-center items-center h-full'>
                <div className='p-4 flex justify-center items-center h-full'>
                    <div className="flex flex-col justify-center text-center align-middle mx-auto">
                        <img src="src/data/img/Logo-HandSpeak.png" alt="home gif" className="homeImage w-36 animate-spin mx-auto select-none " />
                        <h1 className='homeTitle font-bold select-none'>HANDSPEAK</h1>
                        <p className='text-2xl font-normal select-none'>Convierte tus manos en palabras con nuestra app de interpretación
                            de lenguaje de señas impulsada por inteligencia artificial
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}