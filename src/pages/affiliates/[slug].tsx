import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import ItemList from '@/components/affiliates/ItemList';
import React from 'react';
import { Spacer } from '@growth-ui/react';

export default function Brand() {
  return (
    <>
      <AppHeader hideOnMobile bgTransition={false} />
      <AppMain>
        <AppContainer>
          <ItemList />
        </AppContainer>
      </AppMain>
      <AppNav />
    </>
  );
}
