import currencyFormat from '@/lib/currency-format';
import Grid from '@/modules/components/Grid';
import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { Item } from '@prisma/client';
import { ROUTES } from '@/ROUTES';

import {
  Chip,
  Grid as GuiGrid,
  Image,
  Skeleton,
  Spacer,
  StyledParagraph,
  Paragraph,
  MinHeight,
} from '@growth-ui/react';

const GuiGridCol = styled(GuiGrid.Col)`
  border-radius: 10px;
  transition: all 0.4s ease-in-out;

  &: hover {
    transform: translateY(-10px);
    box-shadow: rgb(0 0 0 / 15%) -3px 3px 5px 2px;
  }
`;

const ImageWraper = styled.div`
  position: relative;
  padding-top: 100%;
  background: rgba(0, 0, 0, 0.05);
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
`;

export default function ItemList({ items, loading }: Props) {
  const handleRoute = (slug: string, id: string, amount?: number) => () => {
    let route = `${ROUTES.buy}/${slug}/${id}`;

    if (amount) {
      route = `${ROUTES.buy}/${slug}/${id}?amount=${amount}`;
    }

    Router.push(route);
  };

  const renderPrice = (item: Item) => {
    if (item.originalPrice !== item.price.amount) {
      return (
        <GuiGrid.Row>
          {item.originalPrice && (
            <Paragraph
              style={{
                textDecoration: 'line-through',
              }}
            >
              {currencyFormat(item.originalPrice, item.price.currency)}
            </Paragraph>
          )}
          <Spacer size={10} />
          <Paragraph color="#318200" fontWeight={800}>
            {currencyFormat(item.price.amount, item.price.currency)}
          </Paragraph>
          <Spacer size={10} />
          {item.originalPrice && (
            <Chip
              color="green-400"
              text={`${
                parseFloat((100 -
                +((item.price.amount / item.originalPrice) * 100)).toFixed(2))
              }% OFF`}

              // text={`${
              //   +parseFloat(((item.originalPrice - item.price.amount) / item.originalPrice * 100).toFixed(2))
              // }% OFF`}
            />
          )}
        </GuiGrid.Row>
      );
    }

    return (
      <Paragraph>
        {currencyFormat(item.price.amount, item.price.currency)}
      </Paragraph>
    );
  };

  return (
    <>
      <Spacer size={30} />
      <Grid>
        {loading &&
          new Array(10).fill(0).map((_, i) => (
            <GuiGrid.Col key={i}>
              <div
                style={{
                  position: 'relative',
                  paddingTop: '100%',
                  width: '100%',
                }}
              >
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
            </GuiGrid.Col>
          ))}
        {items?.map((item: Item, idx) => (
          <GuiGridCol key={idx}>
            {item.customerDiscountRate ? (
              <Chip
                color="yellow-500"
                style={{
                  position: 'absolute',
                  top: '7px',
                  right: '7px',
                  zIndex: 8000,
                }}
                text={`${
                  parseFloat((item.customerDiscountRate).toFixed(2))
                }% Rewards`}
              />
            ) : null}
            <ImageWraper>
              <Image
                src={item.imageUrls?.medium}
                alt={item.name}
                style={{
                  width: '100%',
                  cursor: 'pointer',
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  transform: 'translateY(-50%)',
                }}
                onClick={handleRoute(
                  item.slug,
                  item.id,
                  (item as any).ie ? item.amount : undefined,
                )}
              />
            </ImageWraper>
            <Spacer size={5} />
            <MinHeight min="60px" style={{ marginTop: 'auto' }}>
              <Paragraph fontWeight={600}>{item.name}</Paragraph>
              {renderPrice(item)}
            </MinHeight>
          </GuiGridCol>
        ))}
      </Grid>
    </>
  );
}

type Props = {
  items?: Item[];
  loading: boolean;
};
