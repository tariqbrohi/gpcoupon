import Head from '@/modules/components/Head';
import ItemList from '@/modules/components/ItemList';
import React from 'react';
import SearchForm from '@/components/search/SearchForm';
import SearchHistory from '@/components/search/SearchHistory';
import { Padding, Spacer } from '@growth-ui/react';
import { useSearchItemsLazyQuery } from '@/services';

export default function SearchPage() {
  // const [search, { data, loading }] = useSearchItemsLazyQuery();

  return (
    <>
      <Head title="GCoupon | Search" />
      <main>
        <Padding all={1}>
          {/* <SearchForm search={search} /> */}

          <Spacer size={30} />

          {/* <ItemList loading={loading} items={data} /> */}
          <Spacer size={40} />
          {/* <SearchHistory search={search} /> */}
        </Padding>
      </main>
    </>
  );
}
