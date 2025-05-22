
const SearchBar = ({ setName, setPage, topic }) => {
    const handleInputChange = (event) => {
        setName(event.target.value);
        setPage(1)
    };
    return (

        <form className="w-full mx-auto p-8 flex gap-4 justify-center">
            <div className="flex w-lg ">
                <div className="relative w-full">
                    <input onChange={handleInputChange} type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm border border-gray-200 bg-gray-50 rounded-lg focus:outline-none" placeholder={"Busca " + topic + "..."} required />
                    <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-primary-green rounded-e-lg border border-secondary-green hover:bg-secondary-green ">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
            { topic === "productos" &&

                <a href='mercado/comparador' className='flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="32" height="32" stroke-width="2.75"> <path d="M11 16h10"></path> <path d="M11 16l4 4"></path> <path d="M11 16l4 -4"></path> <path d="M13 8h-10"></path> <path d="M13 8l-4 4"></path> <path d="M13 8l-4 -4"></path> </svg>
                </a>
            }
            {
                topic === "usuarios" &&
                <a href='usuarios/bloqueados' className='flex items-center'>
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-ban hover:text-red-600"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M5.7 5.7l12.6 12.6" /></svg>
                </a>
            }
        </form>

    );
};

export default SearchBar;