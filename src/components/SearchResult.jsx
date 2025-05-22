import React from 'react';

const SearchResult = ({ response }) => {
    return (
        <div className="px-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {response && response.products.map((item) => (
                <div key={item._id} name="producto" className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm mx-auto">
                    <a href={"mercado/" + item.id}>
                        
                        <div className="h-50 rounded-t-lg overflow-hidden">
                            <img class="rounded-t-lg" src={item?.image} alt={item?.name + " image"} />
                        </div>
                        <div className="p-5 flex justify-between gap-2">
                            <div className='flex flex-col'>
                                <h5 className="text-xl font-semibold  ">{item.name}</h5>
                                <h5 className="text-sm font-semibold text-gray-500 ">{item.sector}</h5>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-bold ">{item.lastPrice.toFixed(3)}€/Kg</span>
                            </div>
                        </div>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default SearchResult;