import React from 'react';
import { updateForum } from '@utils/updateForum';
import { deleteForum } from '@utils/deleteForum';

const ForumSearchResult = ({ response, admin, token, setName }) => {

    const handleDeleteForum = async (id) => {
        const data = await deleteForum({ id: id, token: token });
        document.getElementById("editForum" + id).close()
        setName(" ");
    }

    const handleUpdateForum = async (id) => {
        const title = document.getElementById("titleEdit" + id).value;
        const description = document.getElementById("descriptionEdit" + id).value;

        const data = await updateForum({ id: id, title: title, description: description, token: token });
        document.getElementById("editForum" + id).close()
        setName(" ");
    }

    return (
        <div className="px-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {response.forums.map((item) => (
                <div key={item._id} name="forum" className="w-full max-w-sm bg-white border-primary-green text-primary-green rounded-lg shadow-smmx-auto hover:bg-primary-green hover:border-darker-green border hover:text-white">
                    <a href={"foro/" + item._id}>
                        <div className="h-20 relative flex flex-col justify-center items-center">
                            {admin && (
                                <div className="absolute w-max h-max p-1 top-1 right-1 hover:cursor-default">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            document.getElementById("editForum" + item._id).showModal()
                                        }}
                                        className=" justify-end font-semibold p2 rounded-lg hover:cursor-pointer"
                                        name="editForumDialog"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                    </button>
                                    <dialog id={"editForum" + item._id} className="rounded-lg p-6 md:p-10 w-max shadow-lg place-self-center" onClick={(e) => {
                                        e.preventDefault();
                                        if (e.target.dataset.stopPropagation === "true") {
                                            document.getElementById("editForum" + item._id).close()
                                        }
                                    }}>
                                        <h2 className="text-lg font-bold mb-6">Editar nombre del foro</h2>
                                        <form method="dialog">
                                            <input type="text"
                                                name="titleEdit"
                                                id={"titleEdit" + item._id}
                                                placeholder="Nombre del foro"
                                                defaultValue={item.title}
                                                className="border border-primary-green p-2 rounded-md w-full mb-6 focus:outline-primary-green"
                                            />
                                            <input
                                                type="text"
                                                name="descriptionEdit"
                                                id={"descriptionEdit" + item._id}
                                                placeholder="Descripción del foro"
                                                defaultValue={item.description}
                                                className="border border-primary-green p-2 rounded-md w-full mb-6 focus:outline-primary-green"
                                            />
                                            <div className="flex justify-between gap-2">
                                                <button
                                                    name="deleteForum"
                                                    data-stop-propagation="true"
                                                    onClick={() => { handleDeleteForum(item._id) }}
                                                    className="bg-red-700 text-white py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-red-800"
                                                >
                                                    Eliminar
                                                </button>
                                                <button
                                                    data-stop-propagation="true"
                                                    className="bg-gray-300 text-black  py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-accent-dark"
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    name="editForum"
                                                    data-stop-propagation="true"
                                                    onClick={() => { handleUpdateForum(item._id) }}
                                                    className="bg-primary-green text-white py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-secondary-green"
                                                >
                                                    Guardar
                                                </button>



                                            </div>
                                        </form>
                                    </dialog>
                                </div>
                            )}
                            <h5 className="text-xl font-normal ">{item.title}</h5>
                        </div>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default ForumSearchResult;