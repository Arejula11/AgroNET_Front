import Pagination from "./Pagination";
import { useEffect, useState } from "react";

const ProductPrices = ({response}) => {
    const[page, setPage] = useState(1);
    const prices = [...response.data.prices].reverse();
    const[pricesPage, setPricesPage] = useState([...response.data.prices].reverse().slice(0, 20));
    const PAGESIZE = 20; 

    useEffect(() => {
        setPricesPage(prices.slice((page - 1) * PAGESIZE, page * PAGESIZE));
    }
    , [page, response]);

    return (


        <div className="relative sm:rounded-lg mx-auto max-w-2xl px-4  pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 hidden lg:block">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fecha
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Precio(€/Kg)
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Var
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pricesPage.map((item,index) => (
                            <tr key={index} className="odd:bg-white even:bg-gray-50 even: border-b border-gray-200">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-[35%] hidden lg:block">
                                    {response.data.name}
                                </td>
                                <td className="px-6 py-4 w-[35%]">
                                    {new Date(item.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                                </td>
                                <td className="px-6 py-4 w-[13%]">
                                    {item.price.toFixed(3)}
                                </td>
                                <td className={`px-6 py-4 w-[12%] ${response.data.prices.indexOf(item) > 0 ? ((item.price - response.data.prices[response.data.prices.indexOf(item) - 1].price) / response.data.prices[response.data.prices.indexOf(item) - 1].price * 100) > 0 ? 'text-green-500' : 'text-red-500' : ''}`}>
                                    {response.data.prices.indexOf(item) > 0 ? ((item.price - response.data.prices[response.data.prices.indexOf(item) - 1].price) / response.data.prices[response.data.prices.indexOf(item) - 1].price * 100) > 0 ? "+" + ((item.price - response.data.prices[response.data.prices.indexOf(item) - 1].price) / response.data.prices[response.data.prices.indexOf(item) - 1].price * 100).toFixed(2) + '%' : ((item.price - response.data.prices[response.data.prices.indexOf(item) - 1].price) / response.data.prices[response.data.prices.indexOf(item) - 1].price * 100).toFixed(2) + '%' : 'N/A'}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Pagination response={{totalPages: Math.ceil(prices.length / PAGESIZE)}} page={page} setPage={setPage} />
        </div>
    );
};

export default ProductPrices;