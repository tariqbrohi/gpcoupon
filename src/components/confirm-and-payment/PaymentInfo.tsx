import Checkout from './Checkout';
import Container from './Container';
import React, { useState } from 'react';
import ThemeButton from '@/modules/components/ThemeButton';
import Typography from '@/modules/components/Typography';
import { color } from '@/modules/brandingTheme';
import { useGetItemQuery } from '@/services';
import { useRouter } from 'next/router';
import {
  Button,
  Chip,
  Grid,
  ProgressiveImage,
  Skeleton,
  Spacer,
} from '@growth-ui/react';

export default function PaymentInfo() {
  const {
    query: { slug, qty = 1 },
  } = useRouter();
  const { data: item, loading } = useGetItemQuery({
    data: {
      slug: slug as string,
    },
  });
  const [open, setOpen] = useState(false);

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
          {item?.discountRate && (
            <Chip
              style={{ background: '#ffeec1', color: '#e16a00' }}
              text={`${item.discountRate}%`}
            />
          )}
          <Spacer size={15} />
          {loading && <Skeleton width={100} height={18} />}
          {item && (
            <Typography>
              G{item.amount.toFixed(2)}/Qty: {qty}
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
              G{(item.amount * +qty).toFixed(2)}
            </Typography>
          </>
        )}
      </Grid.Row>

      <Spacer size={50} />
      <Checkout trigger={<ThemeButton fluid>Go to checkout</ThemeButton>} />
    </Container>
  );
}
