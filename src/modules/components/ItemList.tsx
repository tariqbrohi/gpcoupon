import Grid from '@/modules/components/Grid';
import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { Item } from '@/services/types';
import { nameToSlug } from '@/lib/slugs';
import { ROUTES } from '@/ROUTES';

import {
  Chip,
  Grid as GuiGrid,
  Image,
  Skeleton,
  Spacer,
  StyledParagraph,
} from '@growth-ui/react';

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

export default function ItemList({ items, loading }: Props) {
  return (
    <>
      <Title color="black">Total {items?.length}</Title>
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
            {item.discount ? (
              <Chip
                color="yellow-500"
                style={{
                  position: 'absolute',
                  top: '7px',
                  right: '7px',
                  zIndex: 8000,
                }}
                text={`${item.discount}% Rewards`}
              />
            ) : null}
            <Image
              src={item.image.medium}
              style={{ flex: 1, borderRadius: '10px', cursor: 'pointer' }}
              onClick={() =>
                Router.push(
                  `${ROUTES.buy}/${nameToSlug(item.name)}-${item.amount}`,
                )
              }
            />
            <Spacer size={5} />
            <Title>{item.name}</Title>
            <Amount>G{item.amount.toFixed(2)}</Amount>
          </GuiGrid.Col>
        ))}
      </Grid>
    </>
  );
}

type Props = {
  items: any[] | null;
  loading: boolean;
};
