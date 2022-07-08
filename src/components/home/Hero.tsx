/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import styled from 'styled-components';
import {
  Heading,
  Paragraph,
  StyledHeading,
  Image,
  Spacer,
} from '@growth-ui/react';

const TextWrapper = styled.div`
  width: 320px;

  ${({ theme }) => theme.gui.media.mobile} {
    flex: 1;
  }
`;

const Container = styled.div`
  background: ${({ theme }) => theme.color['themeBg-600']};
  padding: 48px 32px;
  overflow: hidden;

  & > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: ${({ theme }) => theme.size.maxWidth}px;
    margin: 0 auto;
  }

  ${StyledHeading} {
    color: #000;
    font-size: 22px;
  }

  ${({ theme }) => theme.gui.media.mobile} {
    ${StyledHeading} {
      font-size: 18px;
    }

    img {
      display: none;
    }
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

export default function Hero() {
  return (
    // <Container>
    //   <div>
    //     <TextWrapper>
    //       <Heading>
    //         Celebrate special moments and earn real cash back on every purchase,
    //         anywhere around the world.
    //       </Heading>
    //       <Paragraph color="gray-700">
    //         Browse a huge selection of popular brands or shop local with GPoint
    //         Affiliate brands. Buy a GCoupon and earn cash back rewards every
    //         time you shop.
    //       </Paragraph>
    //     </TextWrapper>
    //     <img
    //       width="450px"
    //       src="/images/Coupon_Landing_Page_Main_Banner_V2.svg"
    //       style={{
    //         transform: 'translateX(50px) rotate(15deg)',
    //       }}
    //     />
    //   </div>
    // </Container>
    <Container>
      <Row>
        <Column>
          <Texts>
            <h2>
              Celebrate special moments and earn real cash back on every
              purchase, anywhere around the world.
            </h2>
            <Spacer size={20} />
            <p>
              Browse a huge selection of popular brands or shop local with
              GPoint Affiliate brands. Buy a GCoupon and earn cash back rewards
              every time you shop.
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
              src="/images/mainpageBanner.jpg"
              size="large"
              style={{ alignSelf: 'end' }}
            />
          </div>
        </Column>
      </Row>
    </Container>
  );
}
