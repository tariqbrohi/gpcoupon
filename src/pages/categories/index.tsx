import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';
import AppFooter from '@/layouts/AppFooter';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import CategoryList from '@/components/categories/CategoryList';
import Head from '@/modules/components/Head';
import React from 'react';
import Search from '@/modules/components/Search';
import { Spacer } from '@growth-ui/react';

export default function Categories() {
  return (
    <>
      <Head title="GCoupon | Categories" />
      <AppHeader bgTransition={false} />
      <AppMain>
        <AppContainer>
          {/* <Search hideOnDesktop /> */}
          <Spacer size={30} />
          <CategoryList />
          <Spacer size={50} />
        </AppContainer>
      </AppMain>
      {/* <AppFooter /> */}
      <AppNav />
    </>
  );
}
