import AppContext from '@/modules/components/AppContext';
import List from '@/modules/components/ItemList';
import React, { useContext, useEffect, useState } from 'react';
import { useGetBrandItemsLazyQuery } from '@/services';
import { useRouter } from 'next/router';
import { Grid, Image, Paragraph, Skeleton, Spacer } from '@growth-ui/react';
import ItemListHeader from '@/modules/components/ItemListHeader';

export default function ItemList() {
  const {
    query: { slug },
  } = useRouter();
  const [sortBy, setSortBy] = useState('sales,desc');
  const { country } = useContext(AppContext);
  const [query, { data, loading }] = useGetBrandItemsLazyQuery({
    data: {
      slug,
      country,
    },
  });

  useEffect(() => {
    query({
      data: {
        sortBy,
        slug,
        country,
      },
    });
  }, [sortBy]);

  return (
    <>
      <Grid.Row wrap="wrap">
        <Grid.Col width={16} only={['tablet', 'mobile', 'minimobile']}>
          {loading && (
            <Skeleton
              height={340}
              style={{
                width: 'calc(100% + 16px)',
                maxWidth: 'none',
                marginLeft: '-8px',
                marginTop: '-50px',
              }}
            />
          )}
          {data?.backgroundUrl && (
            <Image
              src={data?.backgroundUrl!}
              alt={data?.name}
              style={{
                width: 'calc(100% + 16px)',
                maxWidth: 'none',
                marginLeft: '-8px',
                marginTop: '-50px',
              }}
            />
          )}
        </Grid.Col>
        <Grid.Col only={['computer', 'widescreen', 'laptop']}>
          <Image
            rounded
            size="small"
            src={data?.thumbnailUrl!}
            alt={data?.name}
          />
        </Grid.Col>
        <Grid.Col mobile={16} minimobile={16}>
          <Spacer size={30} />
        </Grid.Col>
        <Grid.Col flex="1" mobile={16} minimobile={16}>
          <Paragraph fontWeight={700} fontSize={20}>
            {data?.name}
          </Paragraph>
          <Paragraph fontWeight={600}>{data?.description}</Paragraph>
        </Grid.Col>
      </Grid.Row>
      <Spacer size={30} />

      <ItemListHeader total={data?.items?.length || 0} setSortBy={setSortBy} />
      <List loading={loading} items={data?.items} />
      <Spacer size={50} />
    </>
  );
}
