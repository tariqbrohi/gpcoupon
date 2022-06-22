import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Grid, TextField } from '@mui/material';
import { useStyles } from '../../styles/pages/confirmationStyles';
import { Modal } from '@mui/material';
import Spacer from '../Spacer';
import { postCharge } from '@/redux/actions/authActions';
import convert from '@/lib/forex';
import AppContext from '@/providers/app-context';
import { AppContextInterface } from '@/annotations/types';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import Router, { useRouter } from 'next/router';
import { NotifyMethodEnum } from '@/annotations/enums/notify-method.enum';
import NotifyComponent from '@/components/shared/notify';
import parseErrorMessage from '@/lib/parse-error-message';
import { omit } from 'lodash';

const GPointConfirmationModal = (props: any) => {
  const { open, setOpen, qty, currency, item, affiliate = true } = props;
  const { name, amount, id, brand, imageUrl } = item;
  const { userDetail } = useContext(AppContext) as AppContextInterface;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [recipientName, setName] = useState('');
  const router = useRouter();
  const [code, setCode] = useState('');
  const { user } = useContext(AppContext) as AppContextInterface;

  useEffect(() => {
    setCode(`${Math.floor(100000 + Math.random() * 900000)}`);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);

    if (brand === 'gpoint') {
      axios
        .post('/api/purchase', {
          itemId: id,
          code,
          name: recipientName,
          quantity: +qty,
          email,
          giver: userDetail.username,
          giverEmail: userDetail?.profile?.contact?.email,
          meta: {
            currency: 'KRW',
            amount: currency,
          },
        })
        .then(({ data }) => {
          alert(
            `주문을 처리하는데 최대 하루정도 소요가 됩니다. Order ID: ${currency}`,
          );
          Router.push('/');
        })
        .catch((err) => {
          alert(parseErrorMessage(err));
        })
        .finally(() => setLoading(false));
    } else {
      if (user === '') {
        router.replace(`/login`);
        NotifyComponent(
          NotifyMethodEnum.warning,
          `Please Login to place Order.`,
        );
      } else {
        setLoading(true);
        const token =
          typeof window === `object` && localStorage.getItem(`token`);

        try {
          await postCharge({
            userId: user,
            token,
            amount: amount,
            products: item,
            quantity: +qty,
            //
            affiliate,
            code,
            name: recipientName,
            email,
            giver: userDetail.username,
            giverEmail: userDetail?.profile?.contact?.email,
          });

          alert(`Coupon has been sent to ${email}`);
          router.push('/');
        } catch (err: any) {
          alert(err?.message);
        }

        setLoading(false);
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          width: '95%',
          maxWidth: '400px',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" textAlign="center">
          Confirmation
        </Typography>
        <Spacer size={30} />
        <Grid container alignItems={'center'} columns={12}>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
          >
            <img
              src={imageUrl}
              style={{ width: '100px', height: '100px', borderRadius: '10px' }}
            />
            <div style={{ padding: '0 20px' }}>
              <Typography variant="h6">{name}</Typography>
              <Typography fontWeight={600}>
                {brand === 'gpoint'
                  ? convert(amount, currency, 1)
                  : `G${amount?.toFixed(2)}`}
                / Qty: {qty}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Spacer size={50} />
        <Typography fontWeight={700} fontSize={14}>
          Please fill in the recipient information
        </Typography>
        <Spacer size={10} />
        <TextField
          fullWidth
          size="small"
          label="Name"
          value={recipientName}
          onChange={(e) => setName(e.target.value)}
        />
        <Spacer size={15} />
        <TextField
          fullWidth
          size="small"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Spacer size={30} />
        {brand === 'gpoint' && (
          <>
            <Grid item xs={12}>
              <Grid display="flex" justifyContent="space-between">
                <Typography>은행명</Typography>
                <Typography>국민은행</Typography>
              </Grid>

              <Grid display="flex" justifyContent="space-between">
                <Typography>예금주</Typography>
                <Typography>지포인트코리아</Typography>
              </Grid>

              <Grid display="flex" justifyContent="space-between">
                <Typography>계좌번호</Typography>
                <Typography>358801 04 221486</Typography>
              </Grid>

              <Grid display="flex" justifyContent="space-between">
                <Typography>인증번호</Typography>
                <Typography>{code}</Typography>
              </Grid>
              <br />
              <Typography fontWeight={600}>
                입금 시 위에 표기된 인증번호를 입력하셔야 확인됩니다.
              </Typography>
            </Grid>
            <Spacer size={30} />
          </>
        )}
        <Grid item xs={12}>
          <div className={`${classes.flexHeader} ${classes.couponDiv}`}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">
              {brand === 'gpoint'
                ? convert(amount, currency, qty)
                : `G${(amount * qty)?.toFixed(2)}`}
            </Typography>
          </div>
          <Spacer size={30} />
          <LoadingButton
            className={classes.buttonContained}
            variant="contained"
            loading={loading}
            onClick={handleSubmit}
          >
            Continue
          </LoadingButton>
        </Grid>
        {/* <div className={classes.mainConfirmation}>
          
        </div> */}
      </Box>
    </Modal>
  );
};

export default GPointConfirmationModal;
