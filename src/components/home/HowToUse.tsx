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
  font-size: 18px;
  text-align: center;
  padding: 10px 25px;
  box-shadow: rgb(203 203 203) 4px 4px 8px;
  background-color: #FBD9D8;
  color: #BF7582;
  border-radius: 30px;
  border: none;

  ${({ theme }) => theme.gui.media.custom(1024)} {
    font-size: 14px;
  }

  ${({ theme }) => theme.gui.media.mobile} {
    font-size: 12px;
  }
`;

const Description = styled(StyledParagraph)`
  font-size: 18px;
  color: rgba(0, 0, 0, 0.87);
  text-align: center;
  line-height: 1.5;

  ${({ theme }) => theme.gui.media.custom(1024)} {
    font-size: 14px;
  }

  ${({ theme }) => theme.gui.media.mobile} {
    font-size: 12px;
  }
`;

const Wrapper = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${({ theme }) => theme.gui.media.mobile} {
    max-width: 250px;
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
  padding: 10px;

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
      'Pay for your Global purchases easily and instantly. Purchase and redeem your GPcoupon from anywhere around the world.',
  },
  {
    imageUrl: '/images/gift.png',
    title: 'Gifts for all occasions',
    description:
      'Find the perfect gift for any special occasion. Purchase a GPcoupon and input your recipients email to send a gift instantly!',
  },
  {
    imageUrl: '/images/money.png',
    title: 'Cash back rewards',
    description:
      'Earn real cash back when you purchase a big brand GPcoupon. Earn some more when you redeem your GPcoupon at your designated affiliate business.',
  },
];

export default function HowToUse() {
  // const scrollToHere = (elementRef: any) => {
  //   const refLocation: any = document.getElementById(elementRef)?.offsetTop;
  //   window.scrollTo({
  //       top: refLocation - 100,
  //       behavior: "smooth",
  //   });
  // };

  const [showContent, setShowContent] = useState(false);

  const onClickBtn = (e: any) => {
    setShowContent(prevStatus => prevStatus ? false : true);
  }

  const HowToUseContent = () => (
    <div>
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
              src="/images/purchase.png"
              size="large"
              style={{ alignSelf: 'end' }}
            />
          </div>
        </Column>
        <Column>
          <Texts>
            <h2>1. Purchase your GPcoupon</h2>
            <p>
              Browse our selection of local businesses to purchase your GPcoupon
              with cash, GPoints or wire transfer. Receive your Coupon code via
              email and earn cash back rewards with your GPcoupon purchase.
            </p>
          </Texts>
        </Column>
      </Row>
      <Spacer size={100} />

      <RowReverse>
        <Column>
          <Texts>
            <h2>2. Load & Redeem your GPcoupon</h2>
            <p>
              Download your GPoint Wallet to load your GPoint Reloadable
              coupon. Redeem your affiliate GPcoupon at your designated
              location. Pay for your purchase with your GPcoupon by heading
              to the brands's website and Redeeming your GPcoupon online.
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
              GPcoupon. Earn cash back rewards after each and every one of your
              GPcoupon purchases.
            </p>
          </Texts>
        </Column>
      </Row>
    </div>
  );

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
          // onClick={() => scrollToHere('howtouse')}
          onClick={onClickBtn}
        >
          How to use
        </HowBtn>
      </div>
      <Spacer size={100} />

      {showContent ? <HowToUseContent /> : '' }

    </section>
  );
}
