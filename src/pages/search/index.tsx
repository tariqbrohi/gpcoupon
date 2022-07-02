import AppContext from '@/modules/components/AppContext';
import Head from '@/modules/components/Head';
import ItemList from '@/modules/components/ItemList';
import React, { SyntheticEvent, useContext, useState } from 'react';
import SearchHistory from '@/components/search/SearchHistory';
import { Grid, Input, Padding, Paragraph, Spacer } from '@growth-ui/react';
import { useSearchItemsLazyQuery } from '@/services';

export default function SearchPage() {
  const { country, searchHistories, setSearchHistories } =
    useContext(AppContext);
  const [search, { data, loading }] = useSearchItemsLazyQuery();
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
    <>
      <Head title="GCoupon | Search" />
      <main>
        <Padding all={1}>
          <Grid.Row verticalAlign="middle">
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

          <Spacer size={30} />

          <ItemList loading={loading} items={data} />
          <Spacer size={40} />
          <SearchHistory />
        </Padding>
      </main>
    </>
  );
}
