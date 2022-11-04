import AppContext from '@/modules/components/AppContext';
import React, { SyntheticEvent, useContext, useState } from 'react';
import Router from 'next/router';
import { Button, Grid, IconButton, Input, Paragraph, Spacer } from '@growth-ui/react';
import { useSearchResultItemsLazyQuery } from '@/services';
import styled from 'styled-components';

const GridRow = styled(Grid.Row)`
  display: none;

  ${({ theme }) => theme.gui.media.custom(767)} {
    display: flex;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: stretch;
`;

const ButtonCustom = styled(Button)`
  padding: 10px 30px;
  right: 8%;

  ${({ theme }) => theme.gui.media.mobile} {
    padding: 10px;
  }
`;

type Props = {
  search: ReturnType<typeof useSearchResultItemsLazyQuery>[0];
};

export default function SearchForm({ search }: Props) {
  const { country, searchHistories, setSearchHistories } =
    useContext(AppContext);
  const [searchValue, setSearchValue] = useState('');

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
  };

  const handleClick = () => {
    setSearchValue('');
  }

  return (
    <GridRow verticalAlign="middle">
      <Grid.Col only={['mobile', 'minimobile']}>
        <IconButton
          name="chevron left"
          color="black"
          onClick={() => Router.back()}
        />
      </Grid.Col>

      <Grid.Col flex="1">
        <Form onSubmit={handleSubmit}>
          <Input
            fluid
            filled
            placeholder="Search for coupons"
            icon="search"
            size="sm"
            value={searchValue}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearchValue(e.target.value)}
            onClick={handleClick}
          />
          <ButtonCustom icon='search outline' />
        </Form>
      </Grid.Col>
      <Spacer size={10} />

      <Grid.Col>
        <Paragraph
          fontSize="sm"
          style={{ fontWeight: 600, cursor: "pointer" }}
          onClick={() => Router.back()}
        >
          Cancel
        </Paragraph>
      </Grid.Col>
    </GridRow>
  );
}
