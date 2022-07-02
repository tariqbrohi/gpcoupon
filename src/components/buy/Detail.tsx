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
  Chip,
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

  const item = data?.find((item) => item.amount === +amount);

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
              <Grid.Row horizontalAlign="space-between" verticalAlign="middle">
                <Heading as="h2" style={{ width: 'fit-content' }}>
                  {`G${item?.amount.toFixed(2)}`}
                </Heading>
                {item?.discount && (
                  <Chip color="yellow-500" text={`${item.discount}%`} />
                )}
              </Grid.Row>
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
