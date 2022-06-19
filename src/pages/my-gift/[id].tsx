import React from 'react';
import { Button, Divider, Input, TextField } from '@mui/material';
import Image from 'next/image';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

import Layout from '@/components/layout/Layout';
import { useStyles } from '../../styles/components/giftDetailStyle';
import Logo from '../../asset/bi1.jpg';

const MyGiftDetail = () => {
  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.container}>
        <div className={classes.main}>
          <div className={classes.head}>
            <h2 className={classes.number}>Order Number: 821824342</h2>
            <p className={classes.date}>Order date: 2022.05.24</p>
          </div>

          <div className={classes.card}>
            <h2 className={classes.done}>Done</h2>
            <div className={classes.productCard}>
              <div className={classes.imageDiv}>
                <Image src={Logo} alt={`product`} />
              </div>
              <div className={classes.info}>
                <h4 className={classes.brand}>Starbucks</h4>
                <h4 className={classes.title}>Starbucks US$ 5 Gift Card</h4>
                <h4 className={classes.price}>US$ 5.00 / quantity 2</h4>
              </div>
            </div>
            <p className={classes.para}>To. kyunhak</p>
            <div className={classes.list}>
              <h4 className={classes.listName}>
                Recipient&apos;s email address
              </h4>
              <h4 className={classes.listValue}>jhon@gmail.com</h4>
            </div>
            <div className={classes.list}>
              <h4 className={classes.listName}>Sender</h4>
              <h4 className={classes.listValue}>jhon Dev</h4>
            </div>
            <p className={classes.message}>Message</p>
            <TextField
              className={classes.textInput}
              label="text"
              variant="outlined"
            />
            <Button className={classes.btn}>View order details</Button>
          </div>
          <div className={classes.card}>
            <h3 className={classes.paymentheading}>Payment Info</h3>
            <div className={classes.list}>
              <h4 className={classes.listName}>Total</h4>
              <h4 className={classes.listValue}>US% 10.00</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyGiftDetail;
