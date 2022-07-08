import Context, { State } from './Context';
import isEmail from 'validator/lib/isEmail';
import parseErrorMessage from '@/lib/parse-error-message';
import React, { SyntheticEvent, useContext } from 'react';
import ThemeButton from '@/modules/components/ThemeButton';
import {
  Button,
  Input,
  Modal,
  ModalProps,
  Snackbar,
  Spacer,
} from '@growth-ui/react';
import { isEmpty } from 'lodash';
import { useOrderMutation } from '@/services';
import { useState } from 'react';
import Router from 'next/router';

export default function Checkout(props: ModalProps) {
  const { state, setState } = useContext(Context);
  const [errors, setErrors] = useState<Partial<State>>({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
        username,
        password,
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
          <Modal
            trigger={<ThemeButton fluid>Pay with GPoint Wallet</ThemeButton>}
          >
            <Modal.Header>Pay with GPoint</Modal.Header>
            <Modal.Content>
              <form onSubmit={handleCheckout}>
                <Input
                  fluid
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Spacer size={20} />
                <Input
                  fluid
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Spacer size={20} />
                <Button fluid secondary loading={submittng} type="submit">
                  Login and pay
                </Button>
              </form>
            </Modal.Content>
          </Modal>
        </Modal.Content>
      </Modal>
    </>
  );
}
