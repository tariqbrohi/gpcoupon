import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';
import AppFooter from '@/layouts/AppFooter';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import CategoryList from '@/components/categories/CategoryList';
import Head from '@/modules/components/Head';
import React from 'react';
import Search from '@/modules/components/Search';
import { Paragraph, Spacer } from '@growth-ui/react';
import GcouponList from '@/components/g-coupon/GcouponList';

export default function Gcoupons() {
  return (
    <>
      <Head title="GCoupon | G-Coupons" />
      <AppHeader bgTransition={false} />
      <AppMain>
        <AppContainer>
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
