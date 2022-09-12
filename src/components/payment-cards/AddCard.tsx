import PaymentMethodForm from '@/modules/components/PaymentMethodForm';
import React, { ReactNode, useState } from 'react';
import Router from 'next/router';
import { ButtonProps, Modal, ModalProps, Spacer } from '@growth-ui/react';
import { useCreatePaymentCardMutation } from '@/services';
import Stripe from 'stripe';
import parseErrorMessage from '@/lib/parse-error-message';

export default function AddCard({
  onSuccess,
  header,
  buttonText,
  ...props
}: ModalProps & Props) {
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
      .then((res) => {
        if (onSuccess) {
          return onSuccess(res.data);
        }

        // Default behavior is to close the modal
        Router.reload();
      })
      .catch((err) => {
        alert(parseErrorMessage(err));
      });
  };

  return (
    <Modal {...props}>
      {header || <Modal.Header>Add card</Modal.Header>}
      <Modal.Content>
        <Spacer size={20} />
        <PaymentMethodForm
          buttonText={buttonText || 'Add Card'}
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

interface Props {
  header?: ReactNode;
  buttonText?: string;
  onSuccess?: (data: Stripe.PaymentMethod[]) => void;
}
