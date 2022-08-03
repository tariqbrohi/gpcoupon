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
import BrandList from '@/components/brands/BrandList';

export default function Brands() {
  return (
    <>
      <Head title="GCoupon | GPoints" />
      <AppHeader bgTransition={false} />
      <AppMain>
        <AppContainer>
          hi
        </AppContainer>
      </AppMain>
      {/* <AppFooter /> */}
      <AppNav />
    </>
  );
}
