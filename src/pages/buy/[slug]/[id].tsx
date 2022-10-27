import AppContainer from '@/layouts/AppContainer';
import AppFooter from '@/layouts/AppFooter';
import AppHeader from '@/layouts/AppHeader';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import Detail from '@/components/buy/Detail';
import Head from '@/modules/components/Head';
import React from 'react';
import styled from 'styled-components';

const AppContainerCustom = styled(AppContainer)`
  ${({ theme }) => theme.gui.media.mobile} {
    padding-bottom: 30px;
  }
`;

export default function Buy() {
  return (
    <>
      <Head />
      <AppHeader />
      <AppMain>
        <AppContainerCustom>
          <Detail />
        </AppContainerCustom>
      </AppMain>
      <AppNav />
    </>
  );
}
