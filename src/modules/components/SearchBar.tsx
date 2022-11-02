/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { KeyboardEvent, SetStateAction, SyntheticEvent, useContext, useEffect, useState } from 'react';
import { ROUTES } from '@/ROUTES';
import Router, { useRouter } from 'next/router';
import { useSearchResultItemsLazyQuery } from '@/services';
import AppContext from './AppContext';
import { Button } from '@growth-ui/react';

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 0 18px;
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

const Form = styled.form`
    width: 100%;
    display: flex;
    align-items: stretch;
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

const ButtonCustom = styled(Button)`
    // padding: 10px 30px;
    // right: 8%;
    padding: 15px;
    left: 4.2%;
    border-radius: 30px;

    // ${({ theme }) => theme.gui.media.mobile} {
    //     padding: 10px;
    //     right: 14%;
    // }
`;

type Props = {
    search: ReturnType<typeof useSearchResultItemsLazyQuery>[0];
};

export default function SearchBar({ search }: Props) {
    // const [search, { data, loading }] = useSearchResultItemsLazyQuery();
    const [searchValue, setSearchValue] = useState('');
    const { country, searchHistories, setSearchHistories } = useContext(AppContext);
    const router = useRouter();
    const obj = { keyword: searchValue };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setSearchHistories([
            ...searchHistories, 
            searchValue
        ]);

        if (searchValue.length < 4) {
            alert('Please write down at least 4 letters to search');

            return;
        }
      
        search({
            data: {
                country,
                searchQuery: searchValue,
            },
        });

        router.push({
            pathname: ROUTES.search,
            query: {
                searchValue: JSON.stringify(obj),
            },
        })
        
        // Router.push(ROUTES.search);
    };

    useEffect(() => {
        if (!router.isReady) return;
        // console.log('router: ', router.query);
    }, [router.isReady, router.query]);

    console.log('Search Bar: ', searchValue);
  
    const onReset = () => {
      setSearchValue('');
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    }

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSearchValue(event.target.value);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <SearchInput
                    type="text"
                    placeholder="Search for coupons"
                    value={searchValue}
                    onChange={handleChange}
                    onClick={onReset}
                    onKeyPress={handleKeyPress}
                />
                <ButtonCustom icon='search outline' />
            </Form>
        </Container>
    );
}