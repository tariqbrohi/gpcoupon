import AppContext from '@/modules/components/AppContext';
import List from '@/modules/components/ItemList';
import React, { useContext, useEffect, useState } from 'react';
import { useGetCategoryItemsLazyQuery } from '@/services';
import { useRouter } from 'next/router';
import ItemListHeader from '@/modules/components/ItemListHeader';

export default function ItemList() {
  const {
    query: { slug },
  } = useRouter();
  const [sortBy, setSortBy] = useState('sales,desc');
  const { country } = useContext(AppContext);
  const [query, { data, loading }] = useGetCategoryItemsLazyQuery({
    data: {
      slug,
      country,
      sortBy,
    },
  });

  useEffect(() => {
    query({
      data: {
        slug,
        country,
        sortBy,
      },
    });
  }, [sortBy]);

  return (
    <>
      <ItemListHeader total={data?.total || 0} setSortBy={setSortBy} />
      <List loading={loading} items={data?.items} />
    </>
  );
}
