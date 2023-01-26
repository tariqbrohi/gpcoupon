import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { decode } from 'js-base64';
import CryptoJS from 'crypto-js';
import { Paragraph, Spacer, Grid } from '@growth-ui/react';
import styled from 'styled-components';
import Divider from '@/modules/components/Divider';
import currencyFormat from '@/lib/currency-format';
import { useGetGiftsLazyQuery } from '@/services';

const Wrapper = styled('div')`
  border: 3px solid;
  color: #1e3932;
  position: relative;
`;

const Brand = styled('div')`
  color: white;
  padding: 20px;
  width: 100%;
  background-color: #1e3932;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 3px;
`;

function decryptObject(text: string): any {
  return JSON.parse(
    CryptoJS.AES.decrypt(text, 'secret').toString(CryptoJS.enc.Utf8),
  );
}

export default function RedeemGPoint() {
  const {
    query: { key },
  } = useRouter();

  const [data, setData] = useState<any[]>([]);
  const [getGifts] = useGetGiftsLazyQuery();

  useEffect(() => {
    try {
      getGifts({
        data: {
          key: key as string,
        },
      })
        .then(({ data }) => {
          setData(data);
        })
        .catch(() => {});
    } catch {}
  }, []);

  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '20px auto',
      }}
    >
      {data.map((item: any) => (
        <Wrapper key={item.id}>
          <Spacer size={20} />
          <Brand>GPOINT</Brand>
          <Spacer size={40} />
          <Paragraph fontSize={24} textAlign="center">
            <b>{currencyFormat((item.gpoint as any).price.amount, 'GPT')}</b>
            &nbsp;&nbsp; eGift
          </Paragraph>
          <Spacer size={10} />
          <Divider />
          <Spacer size={50} />
          <Grid.Row>
            <Grid.Col padded>
              <img
                src={(item.gpoint as any).imageUrls?.large}
                style={{
                  width: '200px',
                  height: '126px',
                  borderRadius: '10px',
                }}
              />
            </Grid.Col>
            <Grid.Col padded>
              <Paragraph fontWeight={600} textAlign="center">
                Code:
              </Paragraph>
              <Paragraph textAlign="center">{item.code}</Paragraph>
              <Spacer size={30} />
              <Paragraph fontWeight={600} textAlign="center">
                PIN:
              </Paragraph>
              <Paragraph textAlign="center">{item.pin}</Paragraph>
              <Spacer size={30} />
            </Grid.Col>
          </Grid.Row>
          <>
            <Brand style={{ textAlign: 'center' }}>
              GPoint eGift 사용 방법은 간단합니다.
            </Brand>
            <Spacer size={30} />
            <div>
              <Paragraph textAlign="center">
                먼저, GPoint Wallet에 로그인후
                https://gpointwallet.com/account/redeem 에 들어가셔서 쿠폰
                번호와 코드를 입력하시면 충전이 됩니다.
              </Paragraph>
              <Spacer size={30} />
              <Divider />
              <Spacer size={30} />
              <Paragraph textAlign="center" fontSize={12}>
                궁금하거나 이상 사항이 있으시면 영업 시간 8AM - 5PM 사이
                coupon@gpointwallet.com 으로 연락해주세요.
              </Paragraph>
              <Spacer size={30} />
            </div>
          </>
        </Wrapper>
      ))}
    </div>
  );
}
