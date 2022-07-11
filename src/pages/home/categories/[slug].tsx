import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import Head from '@/modules/components/Head';
import ItemList from '@/components/categories/ItemList';
import React from 'react';
import { Spacer } from '@growth-ui/react';

export default function Category() {
  return (
    <>
      <Head title={`GCoupon`} />
      <AppHeader hideOnMobile bgTransition={false} />
      <AppMain>
        <AppContainer>
          <Spacer size={30} />
          <ItemList />
        </AppContainer>
      </AppMain>
      <AppNav />
    </>
  );
}
