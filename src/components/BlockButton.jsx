import { block } from "@utils/blockUnblock";


const BlockButton = ({ userId, token }) => {

    const handleClick = async () => {
        await block({ id: userId, token: token });
        window.location.reload();
    };

    return (
        <div>

            <button id="makeAdmin" onClick={() => document.getElementById("blockDialog").showModal()} className="bg-primary-green text-white px-4 py-2 rounded-lg shadow-md transition hover:scale-105 hover:shadow-lg">
                Bloquear
            </button>
            <dialog id="blockDialog" className="rounded-lg p-12 shadow-lg place-self-center">
                <h2 className="text-lg font-bold mb-6 min-w-72">Bloquear usuario</h2>
                <form method="dialog">
                    <input
                        type="text"
                        id="reason"
                        placeholder="Razón del bloqueo"
                        className="border border-primary-green p-2 rounded-md w-full mb-6 focus:outline-primary-green"
                    />
                    <div className="flex justify-between">
                        <button
                            onClick={() => document.getElementById("blockDialog").close()}
                            className="bg-gray-300 text-black  py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-accent-dark"
                        >
                            Cerrar
                        </button>
                        <button

                            onClick={() => handleClick()}
                            className="bg-primary-green text-white py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-secondary-green"
                        >
                            Bloquear
                        </button>

                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default BlockButton;