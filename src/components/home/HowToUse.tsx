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

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled(StyledParagraph)`
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  // margin-bottom: 15px;
  padding: 10px 25px;
  background-color: #FBD9D8;
  color: #BF7582;
  border-radius: 30px;
  border: none;
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

const HowBtn = styled(Button)`
  background-color: #622AF3;
  color: #fff;
  border-radius: 25px;
  box-shadow: rgb(203 203 203) 4px 4px 8px;
  transition: all 0.7s ease-in-out;

  &:hover {
    background-color: #2D126D;
  }
`;

const Feature = styled.li`
  display: inline-block;
  width: ${({ theme }) => theme.size.maxWidth / 3 - 40}px;
  margin: 0 auto;
  transition: all 0.7s ease-in-out;

  ${StyledImage} {
    margin: 0 auto;
  }
  
  &:hover {
    box-shadow: rgb(0 0 0 / 15%) -3px 3px 5px 2px;
    cursor: pointer;
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

const RowReverse = styled.div`
  display: flex;

  ${({ theme }) => theme.gui.media.mobile} {
    max-width: 180px;
    flex-direction: column-reverse;
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
    imageUrl: '/images/global.png',
    title: 'Global Purchase',
    description:
      'Pay for your Global purchases easily and instantly. Purchase and redeem your GCoupon from anywhere around the world.',
  },
  {
    imageUrl: '/images/gift.png',
    title: 'Gifts for all occasions',
    description:
      'Find the perfect gift for any special occasion. Purchase a G-Coupon and input your recipients email to send a gift instantly!',
  },
  {
    imageUrl: '/images/money.png',
    title: 'Cash back rewards',
    description:
      'Earn real cash back when you purchase a big brand G-coupon. Earn some more when you redeem your GCoupon at your designated affiliate business.',
  },
];

export default function HowToUse() {
  const scrollToHere = (elementRef: any) => {
    const refLocation: any = document.getElementById(elementRef)?.offsetTop;
    window.scrollTo({
        top: refLocation - 100,
        behavior: "smooth",
    });
  };

  useEffect(() => {
    console.log('ismobile: ', isMobile);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <section>
      <Wrapper>
        {features.map(({ imageUrl, title, description }) => (
          <Feature key={title}>
            <Image size="small" src={imageUrl} />
            <TitleDiv>
              <Title>
                {title}
              </Title>
            </TitleDiv>
            <Spacer size={15} />
            <Description>
              {description}
            </Description>
          </Feature>
        ))}
      </Wrapper>
      <Spacer size={60} />
      <div style={{ textAlign: 'center' }}>
        <HowBtn rounded
          onClick={() => scrollToHere('howtouse')}
        >
          How to use
        </HowBtn>
      </div>
      <Spacer size={100} />
      <Row id='howtouse'>
        <Column>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Image
              src="/images/purchase.png"
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

      <RowReverse>
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
              src="/images/redeem.png"
              size="large"
              style={{ alignSelf: 'flex-start' }}
            />
          </div>
        </Column>
      </RowReverse>
      <Spacer size={100} />

      {/* <Row>
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
                  // src="/images/GPoint Wallet_Cell_QR_Code 1.png"
                  src="/images/redeem.png"
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
                  src="/images/redeem.png"
                  size="large"
                  style={{ alignSelf: 'flex-start' }}
                />
              </div>
            </Column>
          </>
        )}
      </Row>
      <Spacer size={100} /> */}
      
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
              src="/images/earn.png"
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
