import AppContext from '@/modules/components/AppContext';
import React, { SyntheticEvent, useContext, useState } from 'react';
import Router from 'next/router';
import { Grid, IconButton, Input, Paragraph, Spacer } from '@growth-ui/react';
import { useSearchItemsLazyQuery } from '@/services';

type Props = {
  search: ReturnType<typeof useSearchItemsLazyQuery>[0];
};

export default function SearchForm({ search }: Props) {
  const { country, searchHistories, setSearchHistories } =
    useContext(AppContext);
  const [q, setQ] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setSearchHistories([...searchHistories, q]);

    search({
      data: {
        country,
        q,
      },
    });
  };

  const handleCancel = () => setQ('');

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
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </form>
      </Grid.Col>
      <Spacer size={10} />
      <Grid.Col>
        <Paragraph
          fontSize="sm"
          style={{ fontWeight: 600 }}
          onClick={handleCancel}
        >
          Cancel
        </Paragraph>
      </Grid.Col>
    </Grid.Row>
  );
}
