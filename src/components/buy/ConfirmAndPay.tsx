import AppContext from '@/providers/app-context';
import Completed from './Completed';
import Grid from '@/modules/components/Grid';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { Item } from '@/services/types';
import { postCharge } from '@/redux/actions/authActions';
import { ROUTES } from '@/ROUTES';
import {
  Button,
  Image,
  Input,
  Modal,
  ModalProps,
  Paragraph,
  Spacer,
} from '@growth-ui/react';

type Props = Item & {
  qty: number;
};

export default function ConfirmAndPay({
  id,
  image,
  name,
  amount,
  qty,
  ...modalProps
}: Props & ModalProps) {
  const [email, setEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const { userDetail } = useContext(AppContext);
  const [success, setSuccess] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleCheckout = () => {
    const token = typeof window === `object` && localStorage.getItem(`token`);

    if (!email || !recipientName || submitting) {
      return;
    }

    setSubmitting(true);

    postCharge({
      amount,
      quantity: qty,
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
  };

  return (
    <Modal {...modalProps} style={{ width: '400px' }}>
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
            <Paragraph fontSize="xs">
              By clicking the button below, I confirm my order and agree to the
              <Link href={ROUTES.legal}>
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
