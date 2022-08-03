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
import BrandList from '@/components/brands/BrandList';

export default function Brands() {
  return (
    <>
      <Head title="GCoupon | Brands" />
      <AppHeader bgTransition={false} />
      <AppMain>
        <AppContainer>
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
