import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { ROUTES } from '@/ROUTES';
import { useGetCategoriesQuery } from '@/services';
import {
  Heading,
  Paragraph,
  ProgressiveImage,
  Skeleton,
  Spacer,
} from '@growth-ui/react';
import Grid from '@/modules/components/Grid';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default function CategoryList() {
  const { data, loading } = useGetCategoriesQuery();

  const handleRoute = (slug: string) => () =>
    Router.push(`${ROUTES.categories}/${slug}`);

  return (
    <>
      <Heading>Categories</Heading>
      <Grid>
        {loading &&
          new Array(10).fill(0).map((i) => (
            <Column key={i}>
              <Skeleton width="100%" height="150px" />
              <Spacer size={5} />
              <Skeleton width="100px" height="0.5em" />
            </Column>
          ))}
        {data?.map((cat) => (
          <Column key={cat.slug}>
            <ProgressiveImage
              rounded
              placeholder={cat.image.small}
              src={cat.image.medium}
              style={{ flex: 1, cursor: 'pointer' }}
              onClick={handleRoute(cat.slug)}
            />
            <Spacer size={5} />
            <Paragraph color="black" fontSize="xs" style={{ fontWeight: 600 }}>
              {cat?.name}
            </Paragraph>
          </Column>
        ))}
      </Grid>
    </>
  );
}
