import AppContext from '@/modules/components/AppContext';
import Grid from '@/modules/components/Grid';
import List from '@/modules/components/ItemList';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { useGetItemsQuery } from '@/services';
import { useRouter } from 'next/router';
import { Spacer, StyledParagraph } from '@growth-ui/react';

const Title = styled(StyledParagraph)`
  font-size: 13px;
  font-weight: 500;
  min-height: 40px;
`;

const Amount = styled(StyledParagraph)`
  font-weight: 600;
  font-size: 16px;
  color: black;
`;

export default function ItemList() {
  const {
    query: { slug },
  } = useRouter();
  const { country } = useContext(AppContext);
  const { data, loading, error } = useGetItemsQuery({
    data: {
      slug,
      country,
    },
  });

  return (
    <>
      <Title color="black">Total {data?.length}</Title>
      <Spacer size={20} />
      <Grid>
        <List loading={loading} items={data} />
      </Grid>
    </>
  );
}
