import Head from 'next/head';
import Image from 'next/image';
import Logo from '@/asset/popular2.jpg';
import {
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  IconButton,
  Divider,
  Button,
  TextField,
  Checkbox,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NextImage from 'next/image';
import { useStyles } from '../styles/pages/confirmationStyles';
import CONTACT from '../asset/contact.svg';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import ShareIcon from '@mui/icons-material/Share';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import Layout from '@/components/layout/Layout';
import DetailsCard from '../components/DetailsCard';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [allCoupon, setAllCoupon] = useState(false);
  const [newCoupon, setNewCoupon] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const classes = useStyles();

  const router = useRouter();

  const handleClose = () => {
    setAllCoupon(false);
  };

  return (
    <Layout>
      <div className={classes.mainConfirmation}>
        <Typography variant="h5">Confirmation</Typography>
        <Grid container alignItems={'center'} columns={12} className={''}>
          <Grid item xs={12} className={classes.productContainer}>
            <div className={classes.image}>
              <Image src={Logo} />
            </div>
            <div>
              <Typography variant="caption" display="block" gutterBottom>
                Starbucks
              </Typography>
              <Typography variant="subtitle2" gutterBottom component="div">
                Perfect Dessert Set
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                US$ 17.74 / Qty: 1
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={`${classes.flexHeader} ${classes.couponDiv}`}>
              <Typography variant="h6">Apply Coupon</Typography>
              <Typography
                onClick={() => {
                  setAllCoupon(true);
                }}
                variant="h6"
              >
                0 Coupons {'>'}
              </Typography>
              <Dialog
                className={classes.modalBody}
                onClose={handleClose}
                maxWidth={'xs'}
                open={allCoupon}
              >
                <IconButton
                  className={classes.modalClose}
                  onClick={() => {
                    setAllCoupon(false);
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <DialogTitle>Coupon</DialogTitle>
                <div
                  className={classes.modalInner}
                  onClick={() => {
                    setAllCoupon(false);
                    setNewCoupon(true);
                  }}
                >
                  <IconButton
                    onClick={() => {
                      setAllCoupon(false);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                  <Typography variant="h6">Add Coupon</Typography>
                </div>
                <div className={classes.availableCoupons}>
                  <p>No coupons available 😭</p>
                </div>
              </Dialog>

              {/* new coupon dialog */}

              <Dialog
                className={`${classes.modalBody} ${classes.modalSecondBody}`}
                onClose={handleClose}
                maxWidth={'xs'}
                open={newCoupon}
              >
                <IconButton
                  className={classes.modalClose}
                  onClick={() => {
                    setNewCoupon(false);
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <DialogTitle>
                  <IconButton
                    onClick={() => {
                      setAllCoupon(true);
                      setNewCoupon(false);
                    }}
                    className={classes.leftArrow}
                  >
                    <KeyboardArrowLeft />
                  </IconButton>
                  Add Coupon
                </DialogTitle>
                <p>Enter the code and redeem your coupon</p>
                <div className={classes.modalInner}>
                  <TextField label="Enter coupon code" variant="outlined" />
                </div>
                <Button
                  className={classes.buttonContained}
                  //   onClick={() => router.push('/confirmation')}
                  variant="contained"
                >
                  Redeem
                </Button>
              </Dialog>
            </div>
            <Divider className={classes.divider} />
            <div className={`${classes.flexHeader} ${classes.couponDiv}`}>
              <Typography variant="h6">Total</Typography>
              <Typography
                onClick={() => {
                  setAllCoupon(true);
                }}
                variant="h6"
              >
                US$ 17.74
              </Typography>
            </div>
            <Typography
              className={classes.smallDetail}
              variant="caption"
              display="block"
              gutterBottom
            >
              By clicking the button below, I confirm my order and agree to the
              Terms and policy of SodaGift.
            </Typography>
            <Button
              className={classes.buttonContained}
              onClick={() => {
                setShowConfirm(true);
              }}
              variant="contained"
            >
              Next
            </Button>
            <Dialog
              className={`${classes.modalBody} ${classes.modalSecondBody}`}
              onClose={handleClose}
              maxWidth={'xs'}
              open={showConfirm}
            >
              <IconButton
                className={classes.modalClose}
                onClick={() => {
                  setNewCoupon(false);
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogTitle>How do you want to send your gift?</DialogTitle>
              <div className={classes.link}>
                <div>
                  <Typography variant="h6">
                    <ShareIcon /> Share link to gift
                  </Typography>

                  <Typography variant="caption">
                    Send a link to your reciepent after payment
                  </Typography>
                </div>
                <Checkbox />
              </div>
              <div className={classes.mobile}>
                <div>
                  <Typography variant="h6">
                    <SendToMobileIcon /> Text Message
                  </Typography>
                </div>
                <Checkbox />
              </div>
              <Button
                className={classes.buttonContained}
                onClick={() => router.push('/payment/recipient_info')}
                variant="contained"
              >
                Next
              </Button>
            </Dialog>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}
