import Context, { State } from './Context';
import isEmail from 'validator/lib/isEmail';
import React, { SyntheticEvent, useContext } from 'react';
import ThemeButton from '@/modules/components/ThemeButton';
import { Button, Input, Modal, ModalProps, Spacer } from '@growth-ui/react';
import { isEmpty } from 'lodash';
import { useOrderMutation } from '@/services';
import { useState } from 'react';

export default function Checkout(props: ModalProps) {
  const { state } = useContext(Context);
  const [errors, setErrors] = useState<Partial<State>>({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [order, { loading, error }] = useOrderMutation();

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

    if (!validate()) return;

    order({
      data: {
        itemId: 27317,
        username,
        password,
        amount: 5,
        message: state.message,
        quantity: 1,
        recipient: {
          name: state.name,
          email: state.email,
        },
      },
    }).catch(() => {});
  };
  console.log(errors);
  return (
    <>
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
                <Button fluid secondary loading={loading} type="submit">
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
