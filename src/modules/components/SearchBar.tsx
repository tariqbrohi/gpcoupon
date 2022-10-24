/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { KeyboardEvent, SetStateAction, SyntheticEvent, useContext, useEffect, useState } from 'react';
import { ROUTES } from '@/ROUTES';
import Router from 'next/router';
import { useSearchResultItemsLazyQuery } from '@/services';
import AppContext from './AppContext';

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
    const [search, { data, loading }] = useSearchResultItemsLazyQuery();
    const [searchValue, setSearchValue] = useState('');
    const { country } = useContext(AppContext);

    const handleClickSearch = async (e: SyntheticEvent) => {
        e.preventDefault();

        search({
            data: {
                country,
                searchQuery: searchValue,
            },
        });
        // console.log('The searchValue is:', searchValue);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleClickSearch(e);
        }
        // console.log('You pressed Enter:', searchValue);
    }

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSearchValue(event.target.value);
    };

    // useEffect(() => {
    //     search({
    //         data: {
    //             searchQuery: searchValue,
    //             country,
    //         },
    //     });
    // }, [searchValue]);

    return (
        <Container>
            <img
                src="/svg/search.svg"
                alt='searchbar'
                style={{
                    width: '20px',
                    marginRight: '5px',
                }}
                // onClick={() => Router.push('/search-result')}
                onClick={handleClickSearch}
            />
            <SearchInput type="text" id='search' name='search' 
                placeholder="Search your Coupon here"
                value={searchValue} 
                onChange={handleChange}
                onKeyPress={handleKeyPress} 
            />
        </Container>
    );
}