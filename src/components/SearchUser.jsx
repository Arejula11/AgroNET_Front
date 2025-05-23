import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import { searchUser } from "@utils/searchUser";
import UserSearchResult from './UserSearchResult';


const SearchUser = ({token}) => {
    const [name, setName] = useState("");
    const [page, setPage] = useState(1);
    const [response, setResponse] = useState({
        users: [],
        page: 0,
        pageSize: 0,
        totalUsers: 0,
        totalPages: 0
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                setResponse(await searchUser({ name: name, page: page, size: 15, token: token }));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [name, page]);


    return (
        <div>
            <SearchBar setName={setName} setPage={setPage} topic="usuarios" />
            <UserSearchResult response={response} />
            <Pagination setPage={setPage} page={page} response={response} />
        </div>
    );
};

export default SearchUser;