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
          <Image rounded src={item?.image.medium!} />
        </Grid.Col>
        <Grid.Col padded width={8} mobile={16} minimobile={16}>
          <Heading>{item?.name}</Heading>
          <Heading as="h2">G{item?.amount.toFixed(2)}</Heading>
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
