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
import BrandList from '@/components/brands/BrandList';
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
  color: #2D126D;

  ${({ theme }) => theme.gui.media.mobile} {
    flex-direction: column;
    padding-inline: 0;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.87);
    text-align: center;
    line-height: 1.5;
  }
`;

const BannerBtn = styled.button`
  padding: 15px 30px;
  border-radius: 25px;
  border: none;
  background-color: #622AF3;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const TextRow = styled.div`
  display: flex;
  padding: 50px 0;
  text-align: center;

  ${({ theme }) => theme.gui.media.mobile} {
    max-width: 180px;
    flex-direction: column;
    margin: 0 auto;
  }
`;

export default function Brands() {
  return (
    <>
      <Head title="GCoupon | Brands" />
      <AppHeader bgTransition={false} />
      <AppMain>
        <Container>
          <Row>
            <Column>
              <Texts>
                <h2>
                  Send the perfect gift this fall <br /> and earn cash back on with every purchase!
                </h2>
                <Spacer size={50} />
                <div>
                  <BannerBtn>
                    Shop GCoupon
                  </BannerBtn>
                </div>
              </Texts>
            </Column>
          </Row>
        </Container>

        <AppContainer>
          <TextRow>
            <Column>
              <Texts>
                <h2 style={{fontSize: "36px"}}>
                  Brands
                </h2>
                <Spacer size={20} />
                <p style={{fontSize: "22px"}}>
                  What would you like to shop?
                </p>
              </Texts>
            </Column>
          </TextRow>

          <Paragraph fontWeight={700} fontSize={26}>
            Brands
          </Paragraph>
          {/* <Search hideOnDesktop /> */}
          <Spacer size={30} />
          <BrandList />
          <Spacer size={50} />
        </AppContainer>
      </AppMain>
      {/* <AppFooter /> */}
      <AppNav />
    </>
  );
}
