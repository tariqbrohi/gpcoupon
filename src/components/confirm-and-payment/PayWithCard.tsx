import parseErrorMessage from '@/lib/parse-error-message';
import { useOrderMutation, usePaymentCardsQuery } from '@/services';
import { Button, Grid, Icon, Modal, Paragraph, Spacer } from '@growth-ui/react';
import { capitalize } from 'lodash';
import Router from 'next/router';
import React, { useContext, useState } from 'react';
import AddCard from '../payment-cards/AddCard';
import Context from './Context';

const getIcon = (brand: string): any => {
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

export default function PayWithCard() {
  const { state, setState } = useContext(Context);
  const { data, loading, refetch } = usePaymentCardsQuery();
  const [order, { loading: submitting }] = useOrderMutation();
  const [paymentMethodId, setPaymentMethodId] = useState<string>('');
  const [openAddCard, setOpenAddCard] = useState(false);

  const handleSubmit = async () => {
    const { item, slug, qty, message, name, email } = state;

    if (!paymentMethodId || !item || submitting) return;

    order({
      data: {
        paymentMethodId,
        itemId: item.id as any,
        slug: slug,
        amount: item.price.amount!,
        message: message,
        quantity: +qty,
        recipient: {
          name: name,
          email: email,
        },
      },
    })
      .then(({ data: id }) => {
        alert(`Order # ${id}`);
        setState({
          ...state,
          name: '',
          email: '',
        });
        Router.push('/');
      })
      .catch((err) => {
        console.log('HERE YOU GO', err);
        alert(parseErrorMessage(err));
      });
  };

  return (
    <>
      <Paragraph fontWeight={600}>Choose payment card</Paragraph>
      <Spacer size={15} />
      <AddCard
        open={openAddCard}
        onClose={() => setOpenAddCard(false)}
        onOpen={() => setOpenAddCard(true)}
        trigger={<Button>Add new card</Button>}
        header={<Modal.Header>Pay with card</Modal.Header>}
        buttonText="Pay"
        onSuccess={async () => {
          // handleSubmit();
          await refetch();
          setOpenAddCard(false);
        }}
      />
      <Spacer size={50} />
      {data &&
        data.map(({ id, card }) => (
          <Grid.Row
            verticalAlign="top"
            horizontalAlign="space-between"
            key={id}
          >
            <Grid.Col flex="1">
              <Grid.Row
                flex="1"
                style={{
                  cursor: 'pointer',
                  padding: '20px',
                  ...(paymentMethodId === id
                    ? { backgroundColor: '#f5f5f5' }
                    : {}),
                }}
                onClick={() => setPaymentMethodId(id)}
              >
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
          </Grid.Row>
        ))}

      <Grid.Row horizontalAlign="right">
        <Button secondary loading={submitting} onClick={handleSubmit}>
          Pay
        </Button>
      </Grid.Row>
    </>
  );
}
