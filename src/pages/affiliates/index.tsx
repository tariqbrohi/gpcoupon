import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';
import AppFooter from '@/layouts/AppFooter';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import CategoryList from '@/components/categories/CategoryList';
import Head from '@/modules/components/Head';
import React from 'react';
import Search from '@/modules/components/Search';
import { Button, Paragraph, Spacer, StyledHeading } from '@growth-ui/react';
import AffiliateList from '@/components/affiliates/AffiliateList';
import styled from 'styled-components';
import ArrowUp from '@/components/arrowUp';

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

const BannerBtn = styled(Button)`
  padding: 15px 30px;
  border-radius: 25px;
  border: none;
  background-color: #622AF3;
  color: #fff;
  box-shadow: -4px 4px 4px 0px #00000040;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-color: #2D126D;
  }
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
  const scrollToHere = (elementRef: any) => {
    const refLocation: any = document.getElementById(elementRef)?.offsetTop;
    window.scrollTo({
        top: refLocation - 100,
        behavior: "smooth",
    });
  };

  return (
    <>
      <Head title="GCoupon | Affiliates" />
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
                  <BannerBtn onClick={() => scrollToHere('affiliates')}>
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
                <h2 id='affiliates' style={{fontSize: "36px"}}>
                  Affiliates
                </h2>
                <Spacer size={20} />
                <p style={{fontSize: "22px"}}>
                  What would you like to shop?
                </p>
              </Texts>
            </Column>
          </TextRow>

          <Paragraph fontWeight={700} fontSize={26}>
            Affiliates
          </Paragraph>
          {/* <Search hideOnDesktop /> */}
          <Spacer size={30} />
          <AffiliateList />
          <Spacer size={50} />
        </AppContainer>
      </AppMain>
      {/* <AppFooter /> */}
      <AppNav />

      <ArrowUp />
    </>
  );
}
