import AppContainer from '@/layouts/AppContainer';
import AppContext from '@/modules/components/AppContext';
import AppFooter from '@/layouts/AppFooter';
import AppHeader from '@/layouts/AppHeader';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import ConfirmAndPay from './ConfirmAndPay';
import Head from '@/modules/components/Head';
import React, { useContext, useState } from 'react';
import { slugToNameAndAmount } from '@/lib/slugs';
import { useRouter } from 'next/router';
import { useSearchItemsQuery } from '@/services';
import {
  Button,
  Grid,
  Heading,
  Image,
  Menu,
  Skeleton,
  Snackbar,
  Spacer,
} from '@growth-ui/react';

export default function Detail() {
  const { country } = useContext(AppContext);
  const {
    query: { slug },
  } = useRouter();
  const { name, amount = 0 } = slugToNameAndAmount(slug as string);
  const { data, loading } = useSearchItemsQuery({
    data: {
      country,
      q: name,
    },
  });
  const [qty, setQty] = useState(1);
  const [activeMenu, setActiveMenu] = useState('description');

  const handleQtyChange = (qty: number) => {
    setQty(qty);
  };

  const handleMenuItemClick = (menu: string) => () => {
    setActiveMenu(menu);
  };

  let item = data?.find((item) => item.amount === +amount);

  if (name === 'gpoint') {
    console.log(name, amount);
    item = {
      discount: 0,
      description: `1. Visit the GPoint Wallet website. 

2. Click the redeem menu.

3. Use the Coupon number and code to redeem your coupon.`,
      expiry: '',
      termsAndConditionsInstructions: 'No refund',
      redemptionInstructions: 'No refund',
      amount: +amount,
      name: `GPoint ${amount}`,
      image: {
        small: '',
        medium:
          amount === '20'
            ? 'http://res.cloudinary.com/dkpoiebus/image/upload/v1656105820/public/ovzddmxixthulwt4tnxt.png'
            : amount === '50'
            ? 'http://res.cloudinary.com/dkpoiebus/image/upload/v1656105890/public/wwvmya8r9fgwnqvz05hz.png'
            : amount === '100'
            ? 'http://res.cloudinary.com/dkpoiebus/image/upload/v1656105928/public/rbyj6m874pfxoqgddfqw.png'
            : 'http://res.cloudinary.com/dkpoiebus/image/upload/v1656105960/public/mc1qgc5jpnb0midv0gnw.png',
      },
      id:
        amount === '20'
          ? '62b62b5f98d36e59c1df838a'
          : amount === '50'
          ? '62b62ba4f04a297f0551a092'
          : amount === '100'
          ? '62b62bc8f04a297f0551a094'
          : '62b62be8f04a297f0551a095',
    };
  }

  return (
    <>
      <Grid.Row wrap="wrap">
        <Grid.Col padded width={8} mobile={16} minimobile={16}>
          {loading && <Skeleton width="100%" height="100%" />}
          <Image rounded src={item?.image.medium!} />
        </Grid.Col>
        <Grid.Col padded width={8} mobile={16} minimobile={16}>
          {loading && (
            <>
              <Skeleton height="32px" width="100%" />
              <Spacer size={10} />
              <Skeleton height="25px" width="70px" />
            </>
          )}
          {item && (
            <>
              <Heading>{item?.name}</Heading>
              <Heading as="h2">{`G${item?.amount.toFixed(2)}`}</Heading>
            </>
          )}
          <Snackbar
            fluid
            info
            message="No returns and no refunds on gift cards."
          />
          <Spacer size={20} />
          <Grid.Row wrap="wrap">
            <Button.Group rounded>
              <Button
                basic
                disabled={qty === 1}
                onClick={() => handleQtyChange(qty - 1)}
              >
                -
              </Button>
              <Button basic>{qty}</Button>
              <Button
                basic
                disabled={qty === 5}
                onClick={() => handleQtyChange(qty + 1)}
              >
                +
              </Button>
            </Button.Group>
            <Grid.Col flex="1">
              {item && (
                <ConfirmAndPay
                  {...item}
                  qty={qty}
                  trigger={
                    <Button fluid rounded secondary>
                      Purchase
                    </Button>
                  }
                />
              )}
            </Grid.Col>
          </Grid.Row>
        </Grid.Col>
      </Grid.Row>
      <Menu secondary>
        <Menu.Item
          active={activeMenu === 'description'}
          name="originals"
          onClick={handleMenuItemClick('description')}
        >
          Description
        </Menu.Item>
        <Menu.Item
          active={activeMenu === 'refund-and-policies'}
          name="content"
          onClick={handleMenuItemClick('refund-and-policies')}
        >
          Refund & Policies
        </Menu.Item>
      </Menu>
      <Spacer size={20} />
      <div>
        {activeMenu === 'description'
          ? item?.description
          : item?.termsAndConditionsInstructions}
      </div>
    </>
  );
}
