import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { ROUTES } from '@/ROUTES';
import { useGetBrandsQuery } from '@/services';
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.05);
  cursor: pointer;
  border-radius: 10px;
`;

export default function BrandList() {
  const { data, loading } = useGetBrandsQuery();
  console.log(data);
  return (
    <>
      <Grid>
        {data?.map((brand) => (
          <div key={brand.id}>{brand.name}</div>
        ))}
      </Grid>
    </>
  );
}
