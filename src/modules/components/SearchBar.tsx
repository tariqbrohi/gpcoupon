/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { SetStateAction, useState } from 'react';
import { ROUTES } from '@/ROUTES';
import Router from 'next/router';

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 18px;
    background: #f4f4f4;
    border-radius: 30px;
    box-shadow: -2px 3px 4px 0px #0000001C;
    width: 100%;
    max-width: 460px;
    cursor: pointer;

    ${({ theme }) => theme.gui.media.mobile} {
        max-width: 100%;
        padding: 12px 18px;
    }
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 8px 4px;
    background-color: transparent;
    border: none;

    &:focus {
        outline: none;
    }
`;

export default function SearchBar() {
    const [search, setSearch] = useState('');

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSearch(event.target.value);
        // console.log('This value is:', event.target.value);
    };

    return (
        <Container 
            onClick={() => Router.push(ROUTES.search)}
        >
            <img
                src="/svg/search.svg"
                alt='searchbar'
                style={{
                    width: '20px',
                    marginRight: '5px',
                }}
            />
            <SearchInput type="text" id='search' name='search' 
                onChange={handleChange} 
                value={search} 
                placeholder="Search your Coupon here"
            />
        </Container>
    );
}