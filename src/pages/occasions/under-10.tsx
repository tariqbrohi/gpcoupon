import React, { useContext } from 'react';
import { useGetOccasionItemsQuery } from '@/services';
import { Spacer } from '@growth-ui/react';
import { useRouter } from 'next/router';
import AppContext from '@/modules/components/AppContext';
import List from '@/modules/components/ItemList';

const Under10 = () => {
  const {
    query: { slug },
  } = useRouter();
  const { country } = useContext(AppContext);
  const { data, loading } = useGetOccasionItemsQuery({
    data: {
      slug,
      country,
    },
  });
  console.log('data: ', data);

  return (
    <>
      <Spacer size={30} />
      <h3>hi</h3>
      {/* <List
        loading={loading}
        items={data?.items.filter(
          (item: { amount: number }) => item.amount < 10,
        )}
      /> */}
    </>
  );
};

export default Under10;
