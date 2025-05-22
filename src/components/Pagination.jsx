import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Pagination({ setPage, page, response }) {
    const handlePrevious = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        if (page < response.totalPages) {

            setPage(page + 1);
        }
    };

    return (
        <div className="flex items-center mt-8 justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={handlePrevious}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
                <nav aria-label="Pagination" name="pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
                    <button
                        onClick={handlePrevious}
                        name="prevPage"
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon aria-hidden="true" className="size-5" />
                    </button>
                    { response && [...Array(response.totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            name={"page"}
                            onClick={() => setPage(index + 1)}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${page === index + 1
                                    ? 'bg-primary-green text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-green'
                                    : 'text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={handleNext}
                        name="nextPage"
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon aria-hidden="true" className="size-5" />
                    </button>
                </nav>
            </div>
        </div>
    )
}


