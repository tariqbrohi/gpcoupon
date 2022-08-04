import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';
import AppMain from '@/layouts/AppMain';
import Head from '@/modules/components/Head';
import React from 'react';
import Under10 from './under-10';

const Occasions = () => {
  return (
    <>
      <Head title="Occasions" />
      <AppHeader bgTransition={false} />
      <AppMain>
        <AppContainer>
          <Under10 />
        </AppContainer>
      </AppMain>
    </>
  );
};

export default Occasions;
