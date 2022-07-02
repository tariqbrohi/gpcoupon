import AppContext from '@/modules/components/AppContext';
import List from '@/modules/components/ItemList';
import React, { useContext } from 'react';
import { useGetItemsQuery } from '@/services';
import { useRouter } from 'next/router';

export default function ItemList() {
  const {
    query: { slug },
  } = useRouter();
  const { country } = useContext(AppContext);

  const { data, loading } = useGetItemsQuery({
    data: {
      slug,
      country,
    },
  });

  return <List loading={loading} items={data} />;
}
