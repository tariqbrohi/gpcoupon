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
// import BrandList from '@/components/brands/BrandList';
// import DashboardList from '@/components/affiliateDashboard/DashboardList';
import CouponList from '@/components/affiliateDashboard/CouponList';

export default function AffiliateDashboard() {
  return (
    <>
      <Head title="GCoupon | AffiliateDashboard" />
      <AppHeader bgTransition={false} />
      <AppMain>
        <AppContainer>
          <Paragraph fontWeight={700} fontSize={26}>
            My Dashboard
          </Paragraph>
          <CouponList />
        </AppContainer>
      </AppMain>
    </>
  );
}