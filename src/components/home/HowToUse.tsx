/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  StyledImage,
  Image,
  StyledParagraph,
  Spacer,
  Button,
} from '@growth-ui/react';
import { isMobile } from 'react-device-detect';

const Title = styled(StyledParagraph)`
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  margin-bottom: 15px;
`;

const Description = styled(StyledParagraph)`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.87);
  text-align: center;
  line-height: 1.5;
`;

const Wrapper = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${({ theme }) => theme.gui.media.mobile} {
    max-width: 180px;
    flex-direction: column;
    margin: 0 auto;
  }
`;

const Feature = styled.li`
  display: inline-block;
  width: ${({ theme }) => theme.size.maxWidth / 3 - 40}px;
  margin: 0 auto;

  ${StyledImage} {
    margin: 0 auto;
  }

  ${({ theme }) => theme.gui.media.mobile} {
    display: block;
    width: 100%;
  }
`;

const Container = styled.div`
  display: flex;
`;
const Row = styled.div`
  display: flex;
  ${({ theme }) => theme.gui.media.mobile} {
    max-width: 180px;
    flex-direction: column;
    margin: 0 auto;
  }
`;
const Column = styled.div`
  flex: 50%;
`;
const Texts = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-inline: 50px;
  font-size: 14px;
  ${({ theme }) => theme.gui.media.mobile} {
    flex-direction: column;
    padding-inline: 0;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.87);
    text-align: center;
    line-height: 1.5;
  }
`;

const features = [
  {
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/8df1/8124/6bcb0e30e3f1476e33e3da1b2c91ae14?Expires=1657497600&Signature=b47gyX-5xK1~aecpD-0pW-1a5pAtVy0Qs~Q0A0XBFjatFygbQvvLomhc0dNiLJmSa5CIyUDx-JotsjMNUBfv~4ewCNHMSzaY-Q5jHjB4cSeG-PLJyDKvU2ZvJrfMeQ540bzo~uN1A0YWepCdi7AhX9XxFnyXiDISArYLCCo4VcBPEu7JJNdmWCt3sb2323OeMHkpg7-a9Dxszrqi~XnAlNl22BXyLa8QwAVoWfuW-tQnSjIsEC2bLQLrZd9sATkJUrj7JC7aqMqKdx7VAMlDSvt4VtZSVtMvldT6YtRQ~77r4-LpuWxz1X8PutCeTNxeHSUWQKEgcuIO2H2cNJRI3w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    title: 'Cash back rewards',
    description:
      'Earn real cash back when you purchase a big brand G-coupon. Earn some more when you redeem your GCoupon at your designated affiliate business.',
  },
  {
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/cca8/ca21/242fa111c0f3330a9f0449c6b1adcb3c?Expires=1657497600&Signature=GCZ3Y4QUK3r4SSkSJ8Q-jBPU04O4HZ3eA3xtSPDnKvMrZ09W~r8I3CYl-4OcM7iekDjvb~miQZmrDmiN1aCnS4t5i71V2oaZj0pDdS5HwRXZmmFeSbU8HLnDwOC170YRjHxKjWPH6FsUMVeOYLmDpOz0PJOd3tMdamBf7Uc1l49WqwEXruQUNZMXxGHVaAX6L-AtGA9ACLugAG7PNyIhTc1qj~bqd46dNvhkZ3-kRg6UIptxPceDk5NYuHeBQi0NwUN6FJxDWSupa6XAm1p5PqQIisxBbHECABnE9To3gG1e2pCWtus6X0tOlOB9ao56-yQmn6rbnIwG2-jIAq7qhA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    title: 'Gifts for all occasions',
    description:
      'Find the perfect gift for any special occasion. Purchase a G-Coupon and input your recipients email to send a gift instantly!',
  },
  {
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/5574/3196/3f240a4efdc7bb43bcc37b53f9209326?Expires=1657497600&Signature=IacID-mqAXhsmCySTFdx5dNQhcn909yQpi8LjKKb5tHBTc8he5THgX2nWNAHxmF2BCyKSYitbevgiJLzOO610aijQG5WGsyzJ9sPaexfP97HLBBYqRU0G5Q0QCsKyohjHOUysA7s3FGD6uVlmRrRj2gdDwB4oLG6Bt7ozv1n6KbTTJPaydQPFdsCIrO0yRjKCK5dNUyQG~TV4n1VKxwS9a-qM-TF31lsI9p4VfrDlFB8dGwRh9THellMij1MEFmvuFMse-LrbEol1MlnIEa65Car8omXDXJBT8434eRERXK2dXqFQV2XDIPTirKMDLNe9BQbqapgk5h8AHY1f2YCNw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    title: 'Global Purchase',
    description:
      'Pay for your Global purchases easily and instantly. Purchase and redeem your GCoupon from anywhere around the world.',
  },
];

export default function HowToUse() {
  useEffect(() => {
    console.log('ismobile: ', isMobile);
  }, [isMobile]);
  return (
    <section>
      <Wrapper>
        {features.map(({ imageUrl, title, description }) => (
          <Feature key={title}>
            <Image size="small" src={imageUrl} />
            <Title>{title}</Title>
            <Description>{description}</Description>
          </Feature>
        ))}
      </Wrapper>
      <Spacer size={60} />
      <div style={{ textAlign: 'center' }}>
        <Button rounded style={{ color: '#fff', background: '#622AF3' }}>
          How to use
        </Button>
      </div>
      <Spacer size={70} />
      <Row>
        <Column>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Image
              src="/images/Image.png"
              size="large"
              style={{ alignSelf: 'end' }}
            />
          </div>
        </Column>
        <Column>
          <Texts>
            <h2>1. Purchase your G-Coupon</h2>
            <p>
              Browse our selection of local businesses to purchase your GCoupon
              with cash, GPoints or wire transfer. Receive your Coupon code via
              email and earn cash back rewards with your GCoupon purchase.
            </p>
          </Texts>
        </Column>
      </Row>
      <Spacer size={100} />
      <Row>
        {isMobile ? (
          <>
            <Column>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src="/images/GPoint Wallet_Cell_QR_Code 1.png"
                  size="large"
                  style={{ alignSelf: 'flex-start' }}
                />
              </div>
            </Column>
            <Column>
              <Texts>
                <h2>2. Load & Redeem your G-Coupon</h2>
                <p>
                  Download your GPoint Wallet to load your GPpoint Reloadable
                  coupon. Redeem your affiliate GCoupon at your designated
                  location. Pay for your purchase with your GCoupon by heading
                  to the brands's website and Redeeming your GCoupon online.
                </p>
              </Texts>
              {/* </div> */}
            </Column>
          </>
        ) : (
          <>
            <Column>
              <Texts>
                <h2>2. Load & Redeem your G-Coupon</h2>
                <p>
                  Download your GPoint Wallet to load your GPpoint Reloadable
                  coupon. Redeem your affiliate GCoupon at your designated
                  location. Pay for your purchase with your GCoupon by heading
                  to the brands's website and Redeeming your GCoupon online.
                </p>
              </Texts>
              {/* </div> */}
            </Column>
            <Column>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src="/images/GPoint Wallet_Cell_QR_Code 1.png"
                  size="large"
                  style={{ alignSelf: 'flex-start' }}
                />
              </div>
            </Column>
          </>
        )}
      </Row>
      <Spacer size={100} />
      <Row>
        <Column>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Image
              src="/images/Cash_Back.png"
              size="large"
              style={{ alignSelf: 'end' }}
            />
          </div>
        </Column>
        <Column>
          <Texts>
            <h2>3. Earn while you shop</h2>
            <p>
              Shop online or visit your GPoint Affiliate business to redeem your
              GCoupon. Earn cash back rewards after each and every one of your
              GCoupon purchases.
            </p>
          </Texts>
        </Column>
      </Row>
    </section>
  );
}
