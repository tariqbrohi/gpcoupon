import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { ROUTES } from '@/ROUTES';
import { useGetItemQuery } from '@/services';
import {
  Button,
  Chip,
  Grid,
  Heading,
  Image,
  Menu,
  Paragraph,
  Skeleton,
  Snackbar,
  Spacer,
} from '@growth-ui/react';
import currencyFormat from '@/lib/currency-format';
import convert from '@/lib/forex';

export default function Detail() {
  const {
    query: { slug, id, amount },
  } = useRouter();

  const { data: item, loading } = useGetItemQuery({
    data: {
      id: id as string,
      amount: amount as any,
    },
  });
  const [qty, setQty] = useState(1);
  const [activeMenu, setActiveMenu] = useState('description');
  const [exchangeRate, setExchangeRate] = useState(1);

  useEffect(() => {
    if (item?.price.currency && item?.price.currency !== 'GPT') {
      convert(item.price.currency, setExchangeRate);
    }
  }, [item]);

  const handleQtyChange = (qty: number) => {
    setQty(qty);
  };

  const handleMenuItemClick = (menu: string) => () => {
    setActiveMenu(menu);
  };

  // -----------------------
  // Renderer
  // -----------------------
  const renderMenu = () => {
    switch (activeMenu) {
      case 'description':
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: item?.redemptionInstructions || '',
            }}
          ></div>
        );
      case 'termsAndConditionsInstructions':
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: item?.termsAndConditionsInstructions || '',
            }}
          ></div>
        );
      case 'expiryAndValidity':
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: (item?.metadata as any)?.expiryAndValidity || '',
            }}
          ></div>
        );
    }
  };

  return (
    <>
      <Grid.Row wrap="wrap">
        <Grid.Col padded width={8} mobile={16} minimobile={16}>
          {loading && <Skeleton width="100%" height="100%" />}
          <Image rounded src={item?.imageUrls?.medium || ''} />
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
              <Chip
                style={{ background: '#ffeec1', color: '#e16a00' }}
                text="eGift"
              />
              <Spacer size={10} />
              <Paragraph fontSize={26} fontWeight={600}>
                {item.name}
              </Paragraph>
              <Paragraph fontSize={20}>{item.extendedName}</Paragraph>
              <Spacer size={10} />
              <Grid.Row horizontalAlign="space-between" verticalAlign="middle">
                <Heading as="h2" style={{ width: 'fit-content' }}>
                  {currencyFormat(
                    item.price.amount * exchangeRate,
                    item.price.currency,
                  )}
                </Heading>
                {item.discountRate ? (
                  <Chip
                    style={{ background: '#ffeec1', color: '#e16a00' }}
                    text={`${item.discountRate}%`}
                  />
                ) : null}
              </Grid.Row>
            </>
          )}
          <Snackbar
            fluid
            info
            message="No returns and no refunds on gift cards."
          />
          <Spacer size={20} />
          <Paragraph fontWeight={500}>You can give up to 5</Paragraph>
          <Spacer size={15} />
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
              <Button
                fluid
                rounded
                secondary
                onClick={() => {
                  let route = `${ROUTES.confirmAndPay}/${slug}/${id}?qty=${qty}`;

                  if (amount) {
                    route = `${ROUTES.confirmAndPay}/${slug}/${id}?amount=${amount}&qty=${qty}`;
                  }

                  Router.push(route);
                }}
              >
                Purchase
              </Button>
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
          active={activeMenu === 'termsAndConditionsInstructions'}
          name="content"
          onClick={handleMenuItemClick('termsAndConditionsInstructions')}
        >
          Refund & Policies
        </Menu.Item>
        <Menu.Item
          active={activeMenu === 'expiryAndValidity'}
          name="content"
          onClick={handleMenuItemClick('expiryAndValidity')}
        >
          Expiry & Validity
        </Menu.Item>
      </Menu>
      <Spacer size={20} />
      <div>{renderMenu()}</div>
    </>
  );
}
