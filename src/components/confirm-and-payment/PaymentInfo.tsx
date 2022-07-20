import Checkout from './Checkout';
import Container from './Container';
import Context from './Context';
import React, { useContext, useEffect, useState } from 'react';
import ThemeButton from '@/modules/components/ThemeButton';
import Typography from '@/modules/components/Typography';
import {
  Chip,
  Grid,
  ProgressiveImage,
  Skeleton,
  Spacer,
} from '@growth-ui/react';
import currencyFormat from '@/lib/currency-format';
import convert from '@/lib/forex';

export default function PaymentInfo() {
  const { state, setState } = useContext(Context);

  const { loading, item, qty, exchangeRate } = state;

  useEffect(() => {
    if (item?.currency && item.currency !== 'GPT') {
      convert(item.currency, (rate) => {
        setState({
          ...state,
          exchangeRate: rate,
        });
      });
    }
  }, [item]);

  return (
    <Container>
      <Grid.Row>
        <Grid.Col>
          {loading && <Skeleton width={150} height={100} />}
          {item && (
            <ProgressiveImage
              placeholder={item.imageUrls.small!}
              src={item.imageUrls.medium!}
              size="small"
            />
          )}
        </Grid.Col>
        <Spacer size={10} />
        <Grid.Col>
          {loading && <Skeleton width={100} height={20} />}
          {item && (
            <Typography fontWeight={600} fontSize={16}>
              {item.name}
            </Typography>
          )}
          <Spacer size={5} />
          {loading && <Skeleton width={46} height={22} />}
          {item?.discountRate ? (
            <Chip
              style={{ background: '#ffeec1', color: '#e16a00' }}
              text={`${item.discountRate}%`}
            />
          ) : null}
          <Spacer size={15} />
          {loading && <Skeleton width={100} height={18} />}
          {item && (
            <Typography>
              {currencyFormat(item.amount * exchangeRate * +qty, item.currency)}{' '}
              / Qty: {qty}
            </Typography>
          )}
        </Grid.Col>
      </Grid.Row>

      <Spacer size={20} />

      <Grid.Row horizontalAlign="space-between">
        {loading && <Skeleton width="100%" height={22} />}
        {item && (
          <>
            <Typography fontWeight={600} fontSize={16}>
              Total pay
            </Typography>
            <Typography fontWeight={600} fontSize={16}>
              {currencyFormat(item.amount * exchangeRate * +qty, item.currency)}
            </Typography>
          </>
        )}
      </Grid.Row>

      <Spacer size={50} />
      <Checkout trigger={<ThemeButton fluid>Go to checkout</ThemeButton>} />
    </Container>
  );
}
