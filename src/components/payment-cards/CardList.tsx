import React from 'react';
import { capitalize } from 'lodash';
import { useDeletePaymentCardMutation, usePaymentCardsQuery } from '@/services';
import {
  Accordion,
  Skeleton,
  Grid,
  Spacer,
  Icon,
  IconProps,
  Paragraph,
  IconButton,
  Loader,
} from '@growth-ui/react';
import Router from 'next/router';

const getIcon = (brand: string): IconProps['name'] => {
  switch (brand) {
    case 'mastercard':
      return 'mastercard-c';
    case 'visa':
      return 'visa-c';
    case 'amex':
      return 'amex-c';
    default:
      return 'visa-c';
  }
};

export default function CardList() {
  const { data, loading } = usePaymentCardsQuery();
  const [deletePaymentCard, { loading: submitting }] =
    useDeletePaymentCardMutation();

  const handleDeletePaymentCard = (id: string) => async () => {
    deletePaymentCard({
      data: {
        id,
      },
    })
      .then(() => Router.reload())
      .catch(() => {});
  };

  return (
    <div>
      {submitting && <Loader />}
      <Accordion style={{ width: '100%' }}>
        {loading &&
          new Array(2).fill(0).map((_, i) => (
            <Accordion.Panel key={i}>
              <Grid.Row verticalAlign="middle">
                <Skeleton width={40} height={40} />
                <Spacer size={15} />
                <div>
                  <Skeleton width={200} />
                  <Spacer size={10} />
                  <Skeleton width={100} />
                </div>
              </Grid.Row>
            </Accordion.Panel>
          ))}
        {data?.map(({ id, card }) => (
          <Grid.Row
            verticalAlign="middle"
            horizontalAlign="space-between"
            key={id}
          >
            <Grid.Col>
              <Grid.Row>
                <Icon name={getIcon(card!.brand)} width={50} height={50} />
                <Spacer size={15} />
                <div>
                  <Paragraph fontSize="sm" style={{ fontWeight: 600 }}>
                    {capitalize(card?.brand)} •••• {card?.last4}
                  </Paragraph>
                  <Paragraph fontSize="sm" color="gray-500">
                    Expires {card?.exp_month} {card?.exp_year}
                  </Paragraph>
                </div>
              </Grid.Row>
            </Grid.Col>
            <Grid.Col>
              <IconButton
                name="trash"
                size={18}
                onClick={handleDeletePaymentCard(id)}
              />
            </Grid.Col>
          </Grid.Row>
        ))}
      </Accordion>
    </div>
  );
}
