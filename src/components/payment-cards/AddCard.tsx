import PaymentMethodForm from '@/modules/components/PaymentMethodForm';
import React, { useState } from 'react';
import Router from 'next/router';
import { Modal, ModalProps, Spacer } from '@growth-ui/react';
import { useCreatePaymentCardMutation } from '@/services';

export default function AddCard(props: ModalProps) {
  const [state, setState] = useState({
    exp: '',
    cvc: '',
    holdername: '',
    number: '',
  });
  const [createPaymentCard, { loading }] = useCreatePaymentCardMutation();

  const handleSubmit = async () => {
    const [expMonth, expYear] = state.exp.split(' / ');
    createPaymentCard({
      data: {
        cvc: state.cvc,
        holdername: state.holdername,
        number: state.number,
        expMonth,
        expYear,
      },
    })
      .then(() => Router.reload())
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal {...props}>
      <Modal.Header>Add card</Modal.Header>
      <Modal.Content>
        <Spacer size={20} />
        <PaymentMethodForm
          buttonText="Add Card"
          buttonProps={{
            onClick: handleSubmit,
            loading,
          }}
          cardExpiryInputProps={{
            value: state.exp,
            onChange: (e) =>
              setState({
                ...state,
                ['exp']: e.target.value,
              }),
          }}
          cardCVCInputProps={{
            value: state.cvc,
            onChange: (e) =>
              setState({
                ...state,
                ['cvc']: e.target.value,
              }),
          }}
          cardNumberInputProps={{
            value: state.number,
            onChange: (e) =>
              setState({
                ...state,
                ['number']: e.target.value,
              }),
          }}
          cardHolderInputProps={{
            value: state.holdername,
            onChange: (e) =>
              setState({
                ...state,
                ['holdername']: e.target.value,
              }),
          }}
        />
      </Modal.Content>
    </Modal>
  );
}
