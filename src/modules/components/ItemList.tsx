import Grid from '@/modules/components/Grid';
import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { Item } from '@prisma/client';
import { nameToSlug } from '@/lib/slugs';
import { ROUTES } from '@/ROUTES';

import {
  Chip,
  Grid as GuiGrid,
  Image,
  Skeleton,
  Spacer,
  StyledParagraph,
  MinHeight,
} from '@growth-ui/react';

const Title = styled(StyledParagraph)`
  font-size: 14px;
  font-weight: 600;
`;

const Amount = styled(StyledParagraph)`
  font-weight: 600;
  font-size: 16px;
  color: black;
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

export default function ItemList({ items, loading }: Props) {
  return (
    <>
      <Title color="black">Total {items?.length}</Title>
      <Spacer size={30} />
      <Grid>
        {loading &&
          new Array(20).fill(0).map((i) => (
            <GuiGrid.Col key={i}>
              <Skeleton width="100%" height="150px" />
              <Spacer size={5} />
              <Skeleton width="100px" height="0.5em" />
            </GuiGrid.Col>
          ))}
        {items?.map((item: Item, idx) => (
          <GuiGrid.Col key={idx}>
            {item.discountRate ? (
              <Chip
                color="yellow-500"
                style={{
                  position: 'absolute',
                  top: '7px',
                  right: '7px',
                  zIndex: 8000,
                }}
                text={`${item.discountRate}% Rewards`}
              />
            ) : null}
            <ImageWraper>
              <Image
                src={item.imageUrls.medium}
                style={{
                  width: '100%',
                  borderRadius: '10px',
                }}
                onClick={() =>
                  Router.push(
                    `${ROUTES.buy}/${nameToSlug(item.name)}-${item.amount}`,
                  )
                }
              />
            </ImageWraper>
            <Spacer size={5} />
            <MinHeight min="60px" style={{ marginTop: 'auto' }}>
              <Title>{item.name}</Title>
              <Amount>G{item.amount.toFixed(2)}</Amount>
            </MinHeight>
          </GuiGrid.Col>
        ))}
      </Grid>
    </>
  );
}

type Props = {
  items?: Item[];
  loading: boolean;
};
