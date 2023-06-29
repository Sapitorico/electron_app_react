export default function HomePage() {
    return (
        <div className='p-4 flex justify-center items-center h-full'>
            <div className="flex flex-col justify-center text-center align-middle">
                <img src="src/data/img/Logo-HandSpeak.png" alt="home gif" className="homeImage w-36 animate-spin mx-auto" />
                <h1 className='homeTitle font-bold'>HANDSPEAK</h1>
                <p className='text-2xl font-normal'>Convierte tus manos en palabras con nuestra app de iterpretación
                    de lenguaje de señas impulsada por inteligencia artificial
                </p>
            </div>
        </div>
    )
}