import React, { useState } from 'react';
import { Box, Typography, Grid, Dialog, Button } from '@mui/material';
import { useStyles } from '../../styles/pages/confirmationStyles';
import { Modal } from '@mui/material';
import Spacer from '../Spacer';
import useAxios from 'axios-hooks';
import convert from '@/lib/forex';

const GPointConfirmationModal = ({
  open,
  setOpen,
  name,
  amount,
  qty,
  imageUrl,
}: any) => {
  const classes = useStyles();
  const [{ data }] = useAxios({
    method: 'post',
    url: '/api/forex',
  });

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
            <img src={imageUrl} style={{ width: '100px', height: '100px' }} />
            <div style={{ padding: '0 20px' }}>
              <Typography variant="h6">{name}</Typography>
              <Typography fontWeight={600}>
                {convert(amount, data, 1)} / Qty: {qty}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Spacer size={50} />
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
            <Typography>
              {Math.floor(100000 + Math.random() * 900000)}
            </Typography>
          </Grid>
          <br />
          <Typography fontWeight={600}>
            입금 시 위에 표기된 인증번호를 입력하셔야 확인됩니다.
          </Typography>
        </Grid>
        <Spacer size={30} />
        <Grid item xs={12}>
          <div className={`${classes.flexHeader} ${classes.couponDiv}`}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">{convert(amount, data, qty)}</Typography>
          </div>
          <Spacer size={30} />
          <Button className={classes.buttonContained} variant="contained">
            구입하기
          </Button>
        </Grid>
        {/* <div className={classes.mainConfirmation}>
          
        </div> */}
      </Box>
    </Modal>
  );
};

export default GPointConfirmationModal;
