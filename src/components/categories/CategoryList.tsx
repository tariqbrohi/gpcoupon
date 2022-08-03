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

const ImageWraper = styled.div`
  position: relative;
  padding-top: 100%;
  background: rgba(0, 0, 0, 0.05);
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
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
          new Array(10).fill(0).map((_, i) => (
            <Column key={i}>
              <div style={{ position: 'relative', paddingTop: '100%' }}>
                <Skeleton
                  width="100%"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                  }}
                />
              </div>
              <Spacer size={5} />
              <Skeleton width="100px" height="0.5em" />
            </Column>
          ))}
        {data?.map((cat) => (
          <Column key={cat.slug}>
            <ImageWraper>
              <ProgressiveImage
                rounded
                placeholder={cat.imageUrls.small}
                src={cat.imageUrls.medium}
                style={{
                  width: '100%',
                  cursor: 'pointer',
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  transform: 'translateY(-50%)',
                }}
                onClick={handleRoute(cat.slug)}
              />
            </ImageWraper>
            <Spacer size={5} />
            <Paragraph
              color="black"
              fontSize="xs"
              style={{ fontWeight: 600, marginTop: 'auto', minHeight: '30px' }}
            >
              {cat?.name}
            </Paragraph>
          </Column>
        ))}
      </Grid>
    </>
  );
}
