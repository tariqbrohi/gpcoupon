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
import AffiliateList from '@/components/affiliates/AffiliateList';

export default function Brands() {
  return (
    <>
      <Head title="GCoupon | Affiliates" />
      <AppHeader bgTransition={false} />
      <AppMain>
        <AppContainer>
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
    </>
  );
}
