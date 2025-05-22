import { getInfoProduct } from '@utils/getInfoProduct';
import React, { useEffect, useState } from 'react';
import PriceChart from './PriceChart';

const ProductInfoComparator = ({ selected, token, number}) => {
    const [response, setResponse] = useState({name: "", sector: "", lastPrice: 0, image: "",  prices:[]});
    useEffect(() => {
        const fetchData = async () => {
            try {
                setResponse(await getInfoProduct({id: selected.id, token: token}))
                console.log(selected)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [selected]);


    return (

        <div className="bg-white">

            <div
                className=" md:mx-auto w-full py-10 lg:flex lg:max-w-7xl lg:flex-col lg:items-center lg:gap-16 lg:px-8 lg:pt-16 "
            >

                <div
                    className="flex flex-col mx-4 gap-2 items-center"
                >
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl text-center">
                        {selected.name}
                    </h1>
                    <h2 className=" text-lg md:text-xl font-semibold text-gray-500  text-center">
                        {selected.sector}
                    </h2>
                    <p className="text-2xl md:text-3xl tracking-tight text-gray-900 text-center">
                        {selected.lastPrice.toFixed(3)}€/Kg
                    </p>
                    <div className="aspect-square rounded-lg overflow-hidden h-80">
                        <img class="rounded-t-lg" src={selected?.image} alt={selected?.name + " image"} />
                    </div>
                </div>
            </div>
            { response.data?.prices && response.data?.prices.length > 0 && <PriceChart response={response} number={number}/>}

        </div>

    );
};

export default ProductInfoComparator;