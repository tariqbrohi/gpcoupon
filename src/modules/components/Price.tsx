import currencyFormat from '@/lib/currency-format';
import React from 'react';
import { Chip, Grid, Paragraph, Spacer } from '@growth-ui/react';
import { Item } from '@prisma/client';

export default function Price({
  item,
  emphasis = false,
}: {
  item: Item;
  emphasis?: boolean;
}) {
  return (
    <Grid.Row verticalAlign="middle">
      {item.originalPrice && item.originalPrice !== item.price.amount && (
        <>
          <Paragraph
            style={{
              textDecoration: 'line-through',
            }}
          >
            {currencyFormat(item.originalPrice, item.price.currency)}
          </Paragraph>
          <Spacer size={10} />
        </>
      )}
      <Paragraph color="#318200" fontWeight={800} fontSize={emphasis ? 24 : 16}>
        {currencyFormat(item.price.amount, item.price.currency)}
      </Paragraph>

      {item.originalPrice &&
        item.originalPrice !== item.price.amount &&
        item.originalPrice && (
          <>
            <Spacer size={10} />
            <Chip
              color="green-400"
              text={`${
                100 -
                +((item.price.amount / item.originalPrice) * 100).toFixed(2)
              }% OFF`}
            />
          </>
        )}
    </Grid.Row>
  );
}
