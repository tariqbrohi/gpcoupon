import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import React from 'react';
import { Spacer } from '@growth-ui/react';
import CouponItemList from '@/components/gpcoupons/ItemList';

export default function Gcoupon() {
  return (
    <>
      <AppHeader hideOnMobile bgTransition={false} />
      <AppMain>
        <AppContainer>
          <CouponItemList />
        </AppContainer>
      </AppMain>
      <AppNav />
    </>
  );
}
