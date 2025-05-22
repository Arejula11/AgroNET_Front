import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import ForumSearchResult from './ForumSearchResult';
import { searchForum } from "@/utils/searchForum.ts";
import { createForum } from "@/utils/createForum.ts";


const SearchForum = ({ token, admin = false }) => {
    const [name, setName] = useState("");
    const [page, setPage] = useState(1);
    const [response, setResponse] = useState({
        forums: [],
        page: 1,
        pageSize: 0,
        totalForums: 0,
        totalPages: 0
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                setResponse(await searchForum({ name: name, page: page, token: token }));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [name, page]);

    const handleCreateForum = async () => {

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const response = await createForum({ title: title, description: description, token: token });
        document.getElementById("createForum").close()
        setName(" ");

    }

    return (
        <div>
            <SearchBar setName={setName} setPage={setPage} topic="foros" />
            {admin && (
                <div className="flex justify-center">
                    <button
                        name="createForumDialog"
                        onClick={() => document.getElementById("createForum").showModal()}
                        className="bg-primary-green text-white font-semibold py-2 px-4 rounded-lg mb-8 hover:cursor-pointer hover:bg-secondary-green"
                    >
                        Crear foro
                    </button>
                    <dialog id="createForum" className="rounded-lg p-12 shadow-lg place-self-center">
                        <h2 className="text-lg font-bold mb-6">Crear un nuevo foro</h2>
                        <form method="dialog">
                            <input
                                type="text"
                                id="title"
                                placeholder="Nombre del foro"
                                className="border border-primary-green p-2 rounded-md w-full mb-6 focus:outline-primary-green"
                            />
                            <input
                                type="text"
                                id="description"
                                placeholder="Descripción del foro"
                                className="border border-primary-green p-2 rounded-md w-full mb-6 focus:outline-primary-green"
                            />
                            <div className="flex justify-between">
                                <button
                                    onClick={() => document.getElementById("createForum").close()}
                                    className="bg-gray-300 text-black  py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-accent-dark"
                                >
                                    Cerrar
                                </button>
                                <button
                                    name="createForum"
                                    onClick={() => handleCreateForum()}
                                    className="bg-primary-green text-white py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-secondary-green"
                                >
                                    Crear
                                </button>

                            </div>
                        </form>
                    </dialog>
                </div>
            )}
            <ForumSearchResult response={response} admin={admin} token={token} setName={setName}/>
            <Pagination setPage={setPage} page={page} response={response} />
        </div>
    );
};

export default SearchForum;