export default function HomePage() {
    return (
        <div class="container w-screen h-screen overflow-hidden">
            <div className="bubbles flex">
                <span class="relative rounded-full shadow-2xl animate-bubble" style={{ '--i': 11 }}></span>
                <span class="relative rounded-full shadow-2xl animate-bubble" style={{ '--i': 13 }}></span>
                <span class="otherBubbles relative rounded-full shadow-2xl animate-bubble" style={{ '--i': 17 }}></span>
                <span class="relative rounded-full shadow-2xl animate-bubble" style={{ '--i': 20 }}></span>
                <span class="relative rounded-full shadow-2xl animate-bubble" style={{ '--i': 14 }}></span>
                <span class="relative rounded-full shadow-2xl animate-bubble" style={{ '--i': 21 }}></span>
                <span class="otherBubbles relative rounded-full shadow-2xl animate-bubble" style={{ '--i': 14 }}></span>
                <span class="relative rounded-full shadow-2xl animate-bubble" style={{ '--i': 25 }}></span>
                <span class="relative rounded-full shadow-2xl animate-bubble" style={{ '--i': 19 }}></span>
                <span class="relative rounded-full shadow-2xl animate-bubble" style={{ '--i': 16 }}></span>
                <span class="otherBubbles relative rounded-full shadow-2xl animate-bubble" style={{ '--i': 23 }}></span>
                <span class="relative rounded-full shadow-2xl animate-bubble" style={{ '--i': 15 }}></span>
                <span class="otherBubbles relative rounded-full shadow-2xl animate-bubble" style={{ '--i': 26 }}></span>
                <span class="relative rounded-full shadow-2xl animate-bubble" style={{ '--i': 29 }}></span>
            </div>
            <div className='mainContainer p-4 flex justify-center items-center h-full'>
                <div className="flex flex-col justify-center text-center align-middle">
                    <img src="src/data/img/Logo-HandSpeak.png" alt="home gif" className="homeImage w-36 animate-spin mx-auto" />
                    <h1 className='homeTitle font-bold'>HANDSPEAK</h1>
                    <p className='text-2xl font-normal'>Convierte tus manos en palabras con nuestra app de iterpretación
                        de lenguaje de señas impulsada por inteligencia artificial
                    </p>
                </div>
            </div>
        </div>
    )
}