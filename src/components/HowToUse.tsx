/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Grid, Heading, Paragraph, Image, Spacer } from '@growth-ui/react';
import { Box } from '@mui/system';

const HowToUse = () => {
  return (
    <>
      <Heading as="h1" textAlign="center" style={{ fontWeight: 'bolder' }}>
        How To Use
      </Heading>
      <Spacer size={50} />
      <Grid.Row>
        <Grid.Col flex="1">
          <Image
            src="/images/Image.png"
            size="large"
            style={{ alignSelf: 'end' }}
          />
        </Grid.Col>
        <Grid.Col flex="1" style={{ marginLeft: '90px' }}>
          <Spacer size={140} />
          <Heading as="h2">1. Purchase your G-Coupon</Heading>
          <Paragraph
            style={{
              marginRight: '50%',
              fontSize: '14px',
              paddingLeft: '2%',
            }}
          >
            Browse our selection of local businesses to purchase your GCoupon
            with cash, GPoints or wire transfer. Receive your Coupon code via
            email and earn cash back rewards with your GCoupon purchase.
          </Paragraph>
        </Grid.Col>
      </Grid.Row>
      <Spacer size={70} />
      <Grid.Row>
        <Grid.Col flex="1" style={{ marginRight: '90px' }}>
          <Spacer size={140} />
          <Heading as="h2" style={{ marginLeft: '40%' }}>
            2. Load & Redeem your G-Coupon
          </Heading>
          <Paragraph
            style={{
              marginLeft: '40%',
              marginRight: '10%',
              fontSize: '14px',
              paddingLeft: '2%',
            }}
          >
            Download your GPoint Wallet to load your GPpoint Reloadable coupon.
            Redeem your affiliate GCoupon at your designated location. Pay for
            your purchase with your GCoupon by heading to the brands's website
            and Redeeming your GCoupon online.
          </Paragraph>
        </Grid.Col>
        <Grid.Col flex="1">
          <Image
            src="/images/GPoint Wallet_Cell_QR_Code 1.png"
            size="large"
            style={{ alignSelf: 'flex-start' }}
          />
        </Grid.Col>
      </Grid.Row>
      <Spacer size={70} />
      <Grid.Row>
        <Grid.Col flex="1">
          <Image
            src="/images/Cash_Back.png"
            size="large"
            style={{ alignSelf: 'end' }}
          />
        </Grid.Col>
        <Grid.Col flex="1" style={{ marginLeft: '90px' }}>
          <Spacer size={140} />
          <Heading as="h2">3. Earn while you shop</Heading>
          <Paragraph
            style={{
              marginRight: '50%',
              fontSize: '14px',
              paddingLeft: '2%',
            }}
          >
            Shop online or visit your GPoint Affiliate business to redeem your
            GCoupon. Earn cash back rewards after each and every one of your
            GCoupon purchases.
          </Paragraph>
        </Grid.Col>
      </Grid.Row>
    </>
  );
};

export default HowToUse;
