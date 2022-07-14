import Context, { State } from './Context';
import isEmail from 'validator/lib/isEmail';
import parseErrorMessage from '@/lib/parse-error-message';
import React, { SyntheticEvent, useContext } from 'react';
import Router from 'next/router';
import ThemeButton from '@/modules/components/ThemeButton';
import { isEmpty } from 'lodash';
import { Modal, ModalProps, Snackbar } from '@growth-ui/react';
import { useOrderMutation } from '@/services';
import { useState } from 'react';

export default function Checkout(props: ModalProps) {
  const { state, setState } = useContext(Context);
  const [errors, setErrors] = useState<Partial<State>>({});

  const [submittng, setSubmitting] = useState(false);
  const [order, { loading }] = useOrderMutation();

  const validate = () => {
    const errors: Partial<State> = {};

    if (!state.email) {
      errors.email = 'Email is required.';
    } else if (!isEmail(state.email)) {
      errors.email = 'Email is not valid.';
    }

    setErrors(errors);

    if (isEmpty(errors)) {
      return true;
    }

    return false;
  };

  const handleCheckout = (e: SyntheticEvent) => {
    e.preventDefault();

    const { item, slug, qty, message, name, email } = state;

    if (!validate() || !item) return;

    setSubmitting(true);

    order({
      data: {
        itemId: item.id as any,
        slug: slug,
        amount: item?.amount,
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
        setSubmitting(false);
        Router.push('/');
      })
      .catch((err) => {
        alert(parseErrorMessage(err));
        setSubmitting(false);
      });
  };

  return (
    <>
      {errors.email && (
        <Snackbar autoHideDuration={3000} message={errors.email} />
      )}
      <Modal {...props}>
        <Modal.Content>
          <ThemeButton
            fluid
            secondary
            loading={submittng}
            onClick={handleCheckout}
          >
            Pay with GPoint Wallet
          </ThemeButton>
        </Modal.Content>
      </Modal>
    </>
  );
}
