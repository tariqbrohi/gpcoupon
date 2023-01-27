import Context, { State } from './Context';
import isEmail from 'validator/lib/isEmail';
import parseErrorMessage from '@/lib/parse-error-message';
import React, { SyntheticEvent, useContext, useEffect } from 'react';
import Router from 'next/router';
import ThemeButton from '@/modules/components/ThemeButton';
import { isEmpty } from 'lodash';
import {
  Modal,
  ModalProps,
  Paragraph,
  Snackbar,
  Spacer,
} from '@growth-ui/react';
import {
  useOrderMutation,
  useForexMutation,
  useGPointOrderMutation,
} from '@/services';
import { useState } from 'react';
import PayWithCard from './PayWithCard';
import convert from '@/lib/forex';
import currencyFormat from '@/lib/currency-format';
import useUser from '@/auth/useUser';

export default function Checkout(props: ModalProps) {
  const { state, setState } = useContext(Context);
  const [errors, setErrors] = useState<Partial<State>>({});
  const [payWithCard, setPayWithCard] = useState(false);
  const { user } = useUser();
  const [submittng, setSubmitting] = useState(false);
  const [order, { loading }] = useOrderMutation();
  const [forexRate, setForexRate] = useState(1);
  const [gpointOrder] = useGPointOrderMutation();
  const [code, setCode] = useState(Math.floor(Math.random() * 900000) + 100000);
  console.log(forexRate);
  useEffect(() => {
    convert('KRW', (rate) => {
      setForexRate(rate);
    });
  }, []);

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
        amount: item?.price.amount,
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
  // generate random number between 100000 and 999999

  if (state.item?.brandId === 'gpoint') {
    return (
      <Modal {...props}>
        <Modal.Content>
          <Paragraph>은행명: 국민은행</Paragraph>
          <Paragraph>환율: {currencyFormat(forexRate, 'KRW')}</Paragraph>
          <Paragraph>계좌번호: 358801-04-221486</Paragraph>
          <Paragraph>예금주: (주)지포인트코리아</Paragraph>
          <Paragraph>
            입금금액:{' '}
            {currencyFormat(
              state.item.price.amount * +state.qty * forexRate,
              'KRW',
            )}
          </Paragraph>
          <Spacer size={30} />
          <Paragraph fontWeight={900}>
            입금시 지포인트월렛에서 사용중인 사용자 이름(유저네임)을 반드시
            기입하셔야 됩니다.
          </Paragraph>
          <Spacer size={30} />
          <Paragraph>
            입금확인 후 상품을 발송해드립니다. 구입을 원하시면 확인버튼을
            눌러주세요.
          </Paragraph>
          <Spacer size={30} />

          <ThemeButton
            loading={submittng}
            onClick={() => {
              if (submittng) return;

              const { item, slug, qty, message, name, email } = state;

              if (!validate() || !item) return;

              setSubmitting(true);

              gpointOrder({
                data: {
                  id: state.item?.id!,
                  qty: +state.qty,
                  recipientEmail: state.email,
                  recipientName: state.name,
                  exchangeRate: forexRate,
                },
              })
                .then((res) => {
                  alert(`Order # ${res.data.id}`);
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
                })
                .finally(() => {
                  setSubmitting(false);
                });
            }}
          >
            확인
          </ThemeButton>
        </Modal.Content>
      </Modal>
    );
  }

  return (
    <>
      {errors.email && (
        <Snackbar autoHideDuration={3000} message={errors.email} />
      )}
      <Modal {...props}>
        <Modal.Content>
          {payWithCard ? (
            <PayWithCard />
          ) : (
            <>
              <ThemeButton
                fluid
                secondary
                loading={submittng}
                onClick={handleCheckout}
              >
                Pay with GPoint Wallet
              </ThemeButton>
              <Spacer size={30} />
              <ThemeButton
                fluid
                secondary
                basic
                onClick={() => setPayWithCard(true)}
              >
                Pay with Card
              </ThemeButton>
            </>
          )}
        </Modal.Content>
      </Modal>
    </>
  );
}
