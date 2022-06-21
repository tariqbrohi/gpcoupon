import Spacer from '@/components/Spacer';
import { Box, Divider, styled, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import currencyFormat from '../../lib/currency-format';
import Used from '@/components/Stamp/Used';

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

export default function RedeemGPoint() {
  const {
    query: { secret },
  } = useRouter();
  const [loading, setLoading] = useState(true);
  const [coupons, setCoupons] = useState<any>([]);
  const [code, setCode] = useState('');

  useEffect(() => {
    try {
      const [orderId, code] = atob(secret as string).split(':');

      axios
        .get(`/api/orders/${orderId}/coupons`)
        .then(({ data }) => {
          setCode(code);
          setCoupons(data);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    } catch {}
  }, []);

  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '20px auto',
      }}
    >
      {coupons.map((c: any) => (
        <Wrapper key={c.id}>
          {c.used && (
            <Used
              style={{
                position: 'absolute',
                top: '100px',
                left: '50%',
                transform: 'translateX(-50%) rotate(-14deg)',
              }}
            />
          )}
          <Spacer size={20} />
          <Brand>GPOINT</Brand>
          <Spacer size={40} />
          <Typography fontSize={24} textAlign="center">
            <b>G{currencyFormat(`${c.item.amount}`)}</b>&nbsp;&nbsp; GPoint
            eGift
          </Typography>
          <Spacer size={10} />
          <Divider />
          <Spacer size={50} />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="/images/Platinum.png"
              style={{ width: '200px', height: '126px' }}
            />
            <Box>
              <Typography variant="h4" textAlign="center">
                Coupon Number:
              </Typography>
              <Typography textAlign="center">{c.id}</Typography>
              <Spacer size={30} />
              <Typography variant="h4" textAlign="center">
                Code:
              </Typography>
              <Typography textAlign="center">{code}</Typography>
              <Spacer size={30} />
            </Box>
          </Box>
          <Brand style={{ textAlign: 'center' }}>
            GPoint eGift 사용 방법은 간단합니다.
          </Brand>
          <Spacer size={30} />
          <Box>
            <Typography textAlign="center">
              먼저, GPoint Wallet에 로그인후
              https://gpointwallet.com/account/redeem 에 들어가셔서 쿠폰 번호와
              코드를 입력하시면 충전이 됩니다.
            </Typography>
            <Spacer size={30} />
            <Divider />
            <Spacer size={30} />
            <Typography textAlign="center" fontSize={12}>
              궁금하거나 이상 사항이 있으시면 영업 시간 8AM - 5PM 사이
              coupon@gpointwallet.com 으로 연락해주세요.
            </Typography>
            <Spacer size={30} />
          </Box>
        </Wrapper>
      ))}
    </div>
  );
}
