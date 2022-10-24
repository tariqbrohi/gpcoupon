import AppContext from '@/modules/components/AppContext';
import React, { SyntheticEvent, useContext, useState } from 'react';
import Router from 'next/router';
import { Grid, IconButton, Input, Paragraph, Spacer } from '@growth-ui/react';
import { useSearchItemsLazyQuery, useSearchResultItemsLazyQuery } from '@/services';
import styled from 'styled-components';

const GridRow = styled(Grid.Row)`
  padding: 150px 0 20px;

  ${({ theme }) => theme.gui.media.mobile} {
    padding: 100px 0 0;
  }
`;

// type Props = {
//   search: ReturnType<typeof useSearchItemsLazyQuery>[0];
// };

type Props = {
  search: ReturnType<typeof useSearchResultItemsLazyQuery>[0];
};

export default function SearchForm({ search }: Props) {
  const { country, searchHistories, setSearchHistories } =
    useContext(AppContext);
  // const [q, setQ] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setSearchHistories([
      ...searchHistories, 
      // q,
      searchValue
    ]);

    search({
      data: {
        country,
        // q,
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
            // value={q}
            // onChange={(e) => setQ(e.target.value)}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
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
