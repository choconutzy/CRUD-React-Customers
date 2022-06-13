import { Input } from 'antd';
import React from 'react';

const { Search }  = Input

const SearchComponent = () => {
    const onSearch = (value) => console.log(value);
    return (
        <Search placeholder="input search text" onSearch={onSearch} enterButton />
    )
};

export default SearchComponent;