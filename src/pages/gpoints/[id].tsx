import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';
import AppFooter from '@/layouts/AppFooter';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import CategoryList from '@/components/categories/CategoryList';
import Head from '@/modules/components/Head';
import React, { useEffect, useState } from 'react';
import Search from '@/modules/components/Search';
import {
  Grid,
  Skeleton,
  Spacer,
  Image,
  Chip,
  Paragraph,
  Snackbar,
  Button,
  Modal,
  Input,
} from '@growth-ui/react';
import BrandList from '@/components/brands/BrandList';
import { useRouter } from 'next/router';
import {
  useForexMutation,
  useGPointOrderMutation,
  useGPointQuery,
} from '@/services';
import Price from '@/modules/components/Price';
import currencyFormat from '@/lib/currency-format';

// generate random number
const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function GPoints() {
  const {
    query: { id },
    reload,
  } = useRouter();
  const [forex] = useForexMutation();
  const [rate, setRate] = useState(1);
  const [code, setCode] = useState(random(100000, 999999));
  const [order, { loading: submitting }] = useGPointOrderMutation();
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');

  useEffect(() => {
    forex({})
      .then(({ data }) => setRate(data))
      .catch(() => {});
  }, []);

  const { data, loading } = useGPointQuery({
    data: {
      id: id as string,
    },
  });
  const [qty, setQty] = useState(1);
  const handleQtyChange = (qty: number) => {
    setQty(qty);
  };

  const handleSubmit = () => {
    order({
      data: {
        id: id as string,
        // code: String(code),
        qty,
        recipientEmail,
        recipientName,
        exchangeRate: 0,
      },
    })
      .then(({ data }) => {
        alert(`Order ${data.id} has been placed`);
        reload();
      })
      .catch(() => {});
  };

  return (
    <>
      <Head title="GCoupon | GPoints" />
      <AppHeader bgTransition={false} />
      <AppMain>
        <AppContainer>
          <Grid.Row wrap="wrap">
            <Grid.Col padded width={8} mobile={16} minimobile={16}>
              {loading && <Skeleton width="100%" height="100%" />}
              <Image rounded src={data?.imageUrl || ''} />
            </Grid.Col>
            <Grid.Col padded width={8} mobile={16} minimobile={16}>
              {loading && (
                <>
                  <Skeleton height="32px" width="100%" />
                  <Spacer size={10} />
                  <Skeleton height="25px" width="70px" />
                </>
              )}
              {data && (
                <>
                  <Chip
                    style={{ background: '#ffeec1', color: '#e16a00' }}
                    text="eGift"
                  />
                  <Spacer size={10} />
                  <Paragraph fontSize={26} fontWeight={600}>
                    {data.name}
                  </Paragraph>
                  <Spacer size={10} />
                  <Paragraph fontWeight={600}>
                    {currencyFormat(data.amount * rate, 'KRW')}
                  </Paragraph>
                  {/* <Grid.Row horizontalAlign="space-between" verticalAlign="middle">
                  <Heading as="h2" style={{ width: 'fit-content' }}>
                    
                    {currencyFormat(item.price.amount, item.price.currency)}
                  </Heading>
                  {item.customerDiscountRate ? (
                    <Chip
                      style={{ background: '#ffeec1', color: '#e16a00' }}
                      text={`${item.customerDiscountRate}%`}
                    />
                  ) : null}
                </Grid.Row> */}
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
                  <Modal
                    trigger={
                      <Button fluid rounded secondary>
                        Purchase
                      </Button>
                    }
                  >
                    <Modal.Content>
                      <Grid.Row>
                        <Grid.Col>
                          <Image src={data?.imageUrl!} size="small" />
                        </Grid.Col>
                        <Spacer size={20} />
                        <Grid.Col>
                          <Paragraph fontWeight={600}>{data?.name}</Paragraph>
                          <Paragraph fontWeight={600}>
                            {currencyFormat((data?.amount || 0) * rate, 'KRW')}{' '}
                            / qty: {qty}
                          </Paragraph>
                          <Paragraph fontWeight={600}>
                            Total Price:{' '}
                            {currencyFormat(
                              (data?.amount || 0) * rate * qty,
                              'KRW',
                            )}
                          </Paragraph>
                        </Grid.Col>
                      </Grid.Row>
                      <Spacer size={30} />
                      <Input
                        fluid
                        label="Recipient Name"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                      />
                      <Spacer size={15} />
                      <Input
                        fluid
                        label="Recipient Email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                      />
                      <Spacer size={30} />
                      <Paragraph fontWeight={600} fontSize={24}>
                        계좌정보
                      </Paragraph>
                      <Paragraph fontWeight={500}>국민은행</Paragraph>
                      <Paragraph fontWeight={500}>
                        회사명: (주)지포인트코리아
                      </Paragraph>
                      <Paragraph fontWeight={500}>
                        계좌번호: 358801 04 221486
                      </Paragraph>
                      <Paragraph fontWeight={600}>인증코드: {code}</Paragraph>
                      <Paragraph fontWeight={600}>
                        송금시 위 인증코드를 메모란에 반드시 기제하셔야 됩니다.
                      </Paragraph>
                      <Spacer size={30} />
                      <Button
                        secondary
                        fluid
                        loading={submitting}
                        onClick={handleSubmit}
                      >
                        Confirm and Order
                      </Button>
                    </Modal.Content>
                  </Modal>
                </Grid.Col>
              </Grid.Row>
            </Grid.Col>
          </Grid.Row>
        </AppContainer>
      </AppMain>
      {/* <AppFooter /> */}
      <AppNav />
    </>
  );
}
