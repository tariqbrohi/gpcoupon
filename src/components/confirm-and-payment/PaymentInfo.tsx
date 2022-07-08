import { useGetItemQuery } from '@/services';
import { Grid, Image } from '@growth-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import Container from './Container';

export default function PaymentInfo() {
  const {
    query: { slug },
  } = useRouter();
  const { data: item, loading } = useGetItemQuery({
    data: {
      slug: slug as string,
    },
  });

  return (
    <Container>
      <Grid.Row>
        <Grid.Col>
          <Image src={item?.imageUrls?.medium!} size="small" />
        </Grid.Col>
        <Grid.Col></Grid.Col>
      </Grid.Row>
    </Container>
  );
}
