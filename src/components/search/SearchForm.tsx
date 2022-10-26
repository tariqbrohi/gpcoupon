import AppContext from '@/modules/components/AppContext';
import React, { SyntheticEvent, useContext, useState } from 'react';
import Router from 'next/router';
import { Grid, IconButton, Input, Paragraph, Spacer } from '@growth-ui/react';
import { useSearchResultItemsLazyQuery } from '@/services';

type Props = {
  search: ReturnType<typeof useSearchResultItemsLazyQuery>[0];
};

export default function SearchForm({ search }: Props) {
  const { country, searchHistories, setSearchHistories } =
    useContext(AppContext);
  const [searchValue, setSearchValue] = useState('');
  // const [extendedNameValue, setExtendedNameValue] = useState('');

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

  return (
    <Grid.Row verticalAlign="middle">
      <Grid.Col only={['mobile', 'minimobile']}>
        <IconButton
          name="chevron left"
          color="black"
          onClick={() => Router.back()}
        />
      </Grid.Col>
      <Grid.Col flex="1">
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Input
            fluid
            filled
            placeholder="Search for coupons"
            icon="search"
            size="sm"
            value={searchValue}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearchValue(e.target.value)}
          />
        </form>
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
    </Grid.Row>
  );
}
