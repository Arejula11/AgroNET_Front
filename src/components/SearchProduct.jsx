import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import { searchProduct } from "@utils/searchProduct";


const SearchProduct = ({token}) => {
    const [name, setName] = useState("");
    const [page, setPage] = useState(1);
    const [response, setResponse] = useState({
        products: [],
        page: 0,
        pageSize: 0,
        totalProducts: 0,
        totalPages: 0
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                setResponse(await searchProduct({ name: name, token: token, page: page, size: 20}));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [name, page]);
    


    return (
        <div>
            <SearchBar setName={setName} setPage={setPage} topic="productos" />
            <SearchResult response={response} />
            <Pagination setPage={setPage} page={page} response={response} />
        </div>
    );
};

export default SearchProduct;