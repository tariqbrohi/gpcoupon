import AppContext from '@/modules/components/AppContext';
import List from '@/modules/components/ItemList';
import React, { useContext } from 'react';
import { useGetBrandItemsQuery } from '@/services';
import { useRouter } from 'next/router';
import { Grid, Image, Paragraph, Spacer } from '@growth-ui/react';

export default function ItemList() {
  const {
    query: { slug },
  } = useRouter();
  const { country } = useContext(AppContext);
  const { data, loading } = useGetBrandItemsQuery({
    data: {
      slug,
      country,
    },
  });

  return (
    <>
      <Grid.Row wrap="wrap">
        <Grid.Col width={16} only={['mobile', 'minimobile']}>
          <Image
            src={
              data?.backgroundUrl! ||
              'https://sodagift.com/img/image/1872487677222300.jpg'
            }
            alt={data?.name}
            style={{
              width: 'calc(100% + 16px)',
              maxWidth: 'none',
              marginLeft: '-8px',
              marginTop: '-50px',
            }}
          />
        </Grid.Col>
        <Grid.Col only={['computer', 'widescreen', 'laptop', 'tablet']}>
          <Image
            rounded
            size="small"
            src={
              data?.thumbnailUrl! ||
              'https://sodagift.com/img/image/51969083109817.jpg'
            }
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
          <Paragraph fontWeight={600}>
            {data?.description ||
              'Provides the prescription medications, health care products, popular beauty and personal care brands from coast to coast.'}
          </Paragraph>
        </Grid.Col>
      </Grid.Row>
      <Spacer size={30} />
      <List loading={loading} items={data?.items} />
    </>
  );
}
