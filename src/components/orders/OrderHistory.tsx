import currencyFormat from '@/lib/currency-format';
import { ROUTES } from '@/ROUTES';
import { useMyGiftsQuery, useResendGiftMutation } from '@/services';
import { Button, Grid, Image, Paragraph, Spacer } from '@growth-ui/react';
import moment from 'moment';
import Router from 'next/router';
import React from 'react';
import styled from 'styled-components';

const Recipient = styled.div`
  margin-top: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid hsla(0, 0%, 85.1%, 0.5);
  padding: 0;
  border-radius: 20px;
  margin-bottom: 20px;

  ${({ theme }) => theme.gui.media.mobile} {
    border: none;
    border-radius: 0;
    border-top: 1px solid hsla(0, 0%, 85.1%, 0.5);
  }
`;

const ItemMeta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid hsla(0, 0%, 85.1%, 0.5);
  padding: 28px 32px;
  width: 30%;

  ${({ theme }) => theme.gui.media.mobile} {
    display: none;
  }
`;

const ItemDetail = styled.div`
  width: 70%;
  padding: 28px 32px;
  ${Recipient} {
    display: none;
  }

  ${({ theme }) => theme.gui.media.mobile} {
    width: 100%;

    ${Recipient} {
      display: block;
    }
  }
`;

export default function OrderHistory() {
  const { data, loading } = useMyGiftsQuery();
  const [resend, { loading: sending }] = useResendGiftMutation();

  const handleResend = (id: string) => () => {
    resend({
      data: {
        id,
      },
    }).catch(() => {});
  };

  return (
    <>
      {data?.map((gift, idx) => (
        <Container key={idx}>
          <ItemMeta>
            <Paragraph fontWeight={600} fontSize={13}>
              Order # {gift.orderNumber}
            </Paragraph>
            <Paragraph color="gray-600" fontSize={14} fontWeight={500}>
              Ordered at {moment(gift.createdAt * 1000).format('MMM DD, YYYY')}
            </Paragraph>
            <Recipient style={{ marginTop: 'auto' }}>
              <Paragraph fontWeight={600}>To.{gift.recipient.name}</Paragraph>
            </Recipient>
          </ItemMeta>
          <ItemDetail
          // style={{ cursor: 'pointer' }}
          // onClick={() => Router.push(`${ROUTES.item}/${gift.item.id}`)}
          >
            <Grid.Row>
              <Grid.Col>
                <Image size="small" rounded src={gift.item.imageUrls.medium} />
              </Grid.Col>
              <Spacer size={10} />
              <Grid.Col flex="1">
                <Paragraph fontWeight={600}>{gift.item.name}</Paragraph>
                <Paragraph fontSize={14} color="gray-600">
                  {currencyFormat(
                    gift.payment.price.amount,
                    gift.payment.price.currency,
                  )}
                  &nbsp;/ qty:
                  {gift.payment.totalAmount / gift.payment.price.amount}
                </Paragraph>
                {gift.payment.discountRate ? (
                  <Paragraph color="gray-600" fontSize={14}>
                    Rewards: {gift.payment.discountRate}%
                  </Paragraph>
                ) : null}
                <div style={{ marginTop: 'auto', width: '100%' }}>
                  <Button fluid onClick={handleResend(gift.orderNumber)}>
                    Resend gift
                  </Button>
                </div>
              </Grid.Col>
            </Grid.Row>
            <Recipient style={{ marginTop: 'auto' }}>
              <Spacer size={15} />
              <Paragraph fontWeight={600}>To.{gift.recipient.name}</Paragraph>
            </Recipient>
          </ItemDetail>
        </Container>
      ))}
    </>
  );
}
