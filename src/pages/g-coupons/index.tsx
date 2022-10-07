import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';
import AppFooter from '@/layouts/AppFooter';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import CategoryList from '@/components/categories/CategoryList';
import Head from '@/modules/components/Head';
import React from 'react';
import Search from '@/modules/components/Search';
import { Paragraph, Spacer, StyledHeading } from '@growth-ui/react';
import GcouponList from '@/components/g-coupon/GcouponList';
import styled from 'styled-components';

const Container = styled.div`
  background-image: url(/images/categories/mainbanner.png);
  background-position: 50% 100%;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 10% 32px;
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

export default function Gcoupons() {
  return (
    <>
      <Head title="GCoupon | G-Coupons" />
      <AppHeader bgTransition={false} />
      <AppMain>
        <Container>
          <Row>
            <Column>
              <Texts>
                <h2 style={{color: "#2D126D"}}>
                  Send the perfect gift this fall <br /> and earn cash back on with every purchase!
                </h2>
                <Spacer size={50} />
                <div>
                  <button style={{padding: "15px 30px", borderRadius: "25px", border: "none", backgroundColor: "#622AF3", color: "#fff"}}>Shop GCoupon</button>
                </div>
              </Texts>
            </Column>
          </Row>
        </Container>

        <AppContainer>
          {/* <Container>
            <Row>
              <Column>
                <Texts>
                  <h2 style={{width: "50%"}}>
                    Send the perfect gift this fall and earn cash back on with every purchase!
                  </h2>
                  <Spacer size={20} />
                  <div>
                    <button>Shop GCoupon</button>
                  </div>
                </Texts>
              </Column>
            </Row>
          </Container> */}

          <Paragraph fontWeight={700} fontSize={26}>
            G-Coupons
          </Paragraph>
          {/* <Search hideOnDesktop /> */}
          <Spacer size={30} />
          <GcouponList />
          <Spacer size={50} />
        </AppContainer>
      </AppMain>
      {/* <AppFooter /> */}
      <AppNav />
    </>
  );
}
