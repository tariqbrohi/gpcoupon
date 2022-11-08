/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { KeyboardEvent, SetStateAction, SyntheticEvent, useState } from 'react';
import { ROUTES } from '@/ROUTES';
import { useRouter } from 'next/router';
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

    ${({ theme }) => theme.gui.media.custom(768)} {
        padding-left: 15px;
    }

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

    ${({ theme }) => theme.gui.media.custom(768)} {
        padding: 8px 0;

        &:: placeholder {
            font-size: 10px;
        }
    }
`;

const ButtonSearch = styled(Button)`
    padding: 15px;
    left: 4.2%;
    border-radius: 30px;

    ${({ theme }) => theme.gui.media.custom(1024)} {
        left: 4.6%
    }

    ${({ theme }) => theme.gui.media.custom(912)} {
        left: 6.8%
    }

    ${({ theme }) => theme.gui.media.custom(820)} {
        padding: 8px;
        left: 10.6%;
    }

    ${({ theme }) => theme.gui.media.custom(768)} {
        padding: 6px;
        left: 14.6%;
    }
`;

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (searchValue.length < 4) {
            alert('Please write down at least 4 letters to search');

            return;
        }

        router.push({
            pathname: ROUTES.search,
            query: {
                searchValue,
            },
        })
    };
  
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
                <ButtonSearch icon='search outline' />
            </Form>
        </Container>
    );
}