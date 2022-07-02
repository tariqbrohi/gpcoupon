import AppContext from '@/providers/app-context';
import Completed from './Completed';
import Grid from '@/modules/components/Grid';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { Item } from '@/services/types';
import { postCharge } from '@/redux/actions/authActions';
import { ROUTES } from '@/ROUTES';
import {
  Button,
  Image,
  Input,
  Modal,
  ModalProps,
  Grid as GuiGrid,
  Paragraph,
  Spacer,
} from '@growth-ui/react';
import Router from 'next/router';
import parseErrorMessage from '@/lib/parse-error-message';

type Props = Item & {
  qty: number;
};

export default function ConfirmAndPay({
  id,
  image,
  name,
  amount,
  discount,
  qty,
  ...modalProps
}: Props & ModalProps) {
  const [email, setEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const { userDetail } = useContext(AppContext);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [code, setCode] = useState('');

  useEffect(() => {
    setCode(`${Math.floor(100000 + Math.random() * 900000)}`);
  }, []);

  const handleCheckout = () => {
    const token = typeof window === `object` && localStorage.getItem(`token`);

    if (!email || !recipientName || submitting) {
      return;
    }

    setSubmitting(true);

    if (name.includes('GPoint')) {
      postCharge({
        amount,
        quantity: qty,
        code,
        userId: userDetail.id,
        affiliate: true,
        token,
        products: {
          id,
          imageUrl: image.medium,
          name,
          amount,
        },
        giver: userDetail.username,
        giverEmail: userDetail?.profile?.contact?.email,
        name: recipientName,
        email,
      })
        .then(({ data }) => {
          alert(
            `주문을 처리하는데 최대 하루정도 소요가 됩니다. Order ID: ${data}`,
          );
          Router.push('/');
        })
        .catch((err) => {
          alert(parseErrorMessage(err));
        })
        .finally(() => setSubmitting(false));
    } else {
      postCharge({
        amount,
        quantity: qty,
        margin: discount,
        userId: userDetail.id,
        token,
        products: {
          id,
          imageUrl: image.medium,
          name,
          amount,
        },
        giver: userDetail.username,
        giverEmail: userDetail?.profile?.contact?.email,
        name: recipientName,
        email,
      })
        .then(() => {
          setSuccess(true);
          setSubmitting(false);
        })
        .catch((err) => {
          alert(err?.message);
          setSubmitting(false);
        });
    }
  };

  return (
    <Modal {...modalProps} style={{ width: '360px' }}>
      <Modal.Content>
        {!success && (
          <>
            <Grid repeat={2}>
              <Image rounded src={image.medium} />
              <div>
                <Paragraph fontSize="sm">
                  <strong>{name}</strong>
                </Paragraph>
                <Paragraph fontSize="xs">
                  G{amount.toFixed(2)} / Qty: {qty}
                </Paragraph>
              </div>
            </Grid>
            <Spacer size={20} />
            <Grid repeat={2}>
              <Paragraph fontSize="sm">
                <strong>Total</strong>
              </Paragraph>
              <Paragraph textAlign="right">
                <strong>G{(amount * qty).toFixed(2)}</strong>
              </Paragraph>
            </Grid>
            <Spacer size={30} />
            <Input
              basic
              fluid
              placeholder="Recipient name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
            <Spacer size={15} />
            <Input
              basic
              fluid
              placeholder="Email"
              icon="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Spacer size={20} />
            {name.includes('GPoint') && (
              <div>
                <GuiGrid.Row horizontalAlign="space-between">
                  <Paragraph>은행명</Paragraph>
                  <Paragraph>국민은행</Paragraph>
                </GuiGrid.Row>

                <GuiGrid.Row horizontalAlign="space-between">
                  <Paragraph>예금주</Paragraph>
                  <Paragraph>지포인트코리아</Paragraph>
                </GuiGrid.Row>

                <GuiGrid.Row horizontalAlign="space-between">
                  <Paragraph>계좌번호</Paragraph>
                  <Paragraph>358801 04 221486</Paragraph>
                </GuiGrid.Row>

                <GuiGrid.Row horizontalAlign="space-between">
                  <Paragraph>인증번호</Paragraph>
                  <Paragraph>{code}</Paragraph>
                </GuiGrid.Row>
                <br />
                <Paragraph fontWeight={600}>
                  입금 시 위에 표기된 인증번호를 입력하셔야 확인됩니다.
                </Paragraph>
              </div>
            )}
            <Spacer size={30} />
            <Paragraph fontSize="xs">
              By clicking the button below, I confirm my order and agree to the
              <Link href={ROUTES.privacy}>
                <a style={{ color: '#2b78ff' }}> privacy policy of GCoupon</a>
              </Link>
              . I also acknowledge that as stated in the{' '}
              <Link href={ROUTES.legal}>
                <a style={{ color: '#2b78ff' }}>Terms of Use </a>
              </Link>
              all sales are final and there are no returns and no refunds on
              gift cards.
            </Paragraph>
            <Spacer size={30} />
            <Button
              fluid
              secondary
              loading={submitting}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </>
        )}
        {success && <Completed email={email} imageUrl={image.medium} />}
      </Modal.Content>
    </Modal>
  );
}
