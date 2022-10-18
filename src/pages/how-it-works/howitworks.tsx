/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import styled from 'styled-components';
import {
    Image,
    Spacer,
} from '@growth-ui/react';

function getHeight({ axis, size }: any) {
    return axis === 'horizontal' ? 0 : size;
}
function getWidth({ axis, size }: any) {
    return axis === 'vertical' ? 0 : size;
}

const SpacerHalfMobile = styled(Spacer)`
    display: block;
    width: ${getWidth}px;
    min-width: ${getWidth}px;
    height: ${getHeight}px;
    min-height: ${getHeight}px;
    
    ${({ theme }) => theme.gui.media.mobile} {
        & {
            width: calc(${getWidth}px / 2);
            min-width: calc(${getWidth}px / 2);
            height: calc(${getHeight}px / 2);
            min-height: calc(${getHeight}px / 2);
        }
    }
`;

const Container = styled.div`
    padding: 50px 0;

    ${({ theme }) => theme.gui.media.mobile} {
        padding: 0;
    }
`;

const MainH1 = styled.h1`
    text-align: center;
    color: #2D126D;
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

const ContentH2 = styled.h2`
    color: #2D126D;
`;

const ContentPara = styled.p`
    color: #404040;

    &:not(:last-child) {
        margin-bottom: 5px;
    }
`;

export default function HowItWorksContent() {
    return (
        <Container>
            <MainH1>
                How To Use Our GPcoupon
            </MainH1>
            <SpacerHalfMobile size={100} />

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
                    <ContentH2>1. Purchase your GPcoupon</ContentH2>
                    <Spacer size={10} />
                    <ContentPara>
                        Browse our selection of local businesses to purchase your GPcoupon with cash, GPoints or wire transfer. 
                        Receive your Coupon code via email and earn cash back rewards with your GPcoupon purchase.
                    </ContentPara>
                </Texts>
              </Column>
            </Row>
            <Spacer size={100} />

            <RowReverse>
                <Column>
                    <Texts>
                        <ContentH2>2. Load & Redeem your GPcoupon</ContentH2>
                        <Spacer size={10} />
                        <div>
                            <ContentPara>Download your GPoint Wallet to load your GPoint Reloadable coupon.</ContentPara>
                            <ContentPara>Redeem your affiliate GPcoupon at your designated location.</ContentPara>
                            <ContentPara>Pay for your purchase with your GPcoupon by heading to the brands's website and Redeeming your GPcoupon online.</ContentPara>
                        </div>
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
                        <ContentH2>3. Earn while you shop</ContentH2>
                        <Spacer size={10} />
                        <div>
                            <ContentPara>Shop online or visit your GPoint Affiliate business to redeem your GPcoupon. </ContentPara>
                            <ContentPara>Earn cash back rewards after each and every one of your GPcoupon purchases.</ContentPara>
                        </div>
                    </Texts>
                </Column>
            </Row>
        </Container>
    );
}
