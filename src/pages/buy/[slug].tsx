import AppContainer from '@/layouts/AppContainer';
import AppFooter from '@/layouts/AppFooter';
import AppHeader from '@/layouts/AppHeader';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import Detail from '@/components/buy/Detail';
import Head from '@/modules/components/Head';
import React from 'react';

export default function Buy() {
  return (
    <>
      <Head title="" />
      <AppHeader />
      <AppMain>
        <AppContainer>
          <Detail />
        </AppContainer>
      </AppMain>
      <AppNav />
    </>
  );
}
