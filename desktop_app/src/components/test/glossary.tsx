import gif1 from 'src/data/gifts/frog-sitting.gif';
import gif2 from 'src/data/gifts/pato-caminando.gif';
import gif3 from 'src/data/gifts/dog.gif';

const number_gifList = {
    '0': gif1,
    '1': gif2,
    '2': gif3,
};

const letter_gifList = {
    'A': gif1,
    'B': gif2,
    'C': gif3,
}

export default function Glossary() {
    const alphabet_arr: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const number_arr: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    return (
        <div className="relative flex h-screen">
            <div>
                <h1 className="m-5 text-2xl font-bold">Alfabeto</h1>
                <div className="flex flex-wrap gap-5 m-5">
                    {alphabet_arr.map((letter, index) => (
                        <div className="card" key={index}>
                            <button
                                className="card card-body w-5 glass min-w-[5rem] justify-center text-center text-2xl"
                                onClick={() => document.getElementById(`my_modal_${index}`).showModal()}>
                                {letter}
                            </button>
                            <dialog id={`my_modal_${index}`} className="modal">
                                <form method="dialog" className="modal-box">
                                    <h3 className="font-bold text-lg">{letter}</h3>
                                    <img src={letter_gifList[letter]} alt="my-gif"/>
                                    <div className="modal-action">
                                        <button className="btn">Close</button>
                                    </div>
                                </form>
                            </dialog>
                        </div>
                    ))}
                </div>
                <h1 className="m-5 text-2xl font-bold">Numeros</h1>
                <div className="flex flex-wrap gap-5 m-5">
                    {number_arr.map((number, index) => (
                        <div className="card" key={index}>
                                <button className="card card-body w-5 glass min-w-[5rem] justify-center text-center text-2xl"
                                        onClick={() => document.getElementById(`my_modal_${index}`).showModal()}>
                                    {number}
                                </button>
                                <dialog id={`my_modal_${index}`} className="modal">
                                    <form method="dialog" className="modal-box">
                                        <h3 className="font-bold text-lg">{number}</h3>
                                        <img src={number_gifList[number]} alt="my-gif"/>
                                        <div className="modal-action">
                                            <button className="btn">Close</button>
                                        </div>
                                    </form>
                                </dialog>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
