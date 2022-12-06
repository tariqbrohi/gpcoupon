import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import AppHeader from '@/layouts/AppHeader';
import AppContainer from '@/layouts/AppContainer';
import Head from '@/modules/components/Head';
import AffiliateDashboardLayout from '@/layouts/AffiliateDashgoardLayout';
import AppMain from '@/layouts/AppMain';
import CreateBrandForm from '@/components/affiliateDashboard/brand/CreateBrand';

export default function CreateBrand() {
  
    return (
     <>
      <Head title='GPcoupon | AffiliateDashboard' />
      <AppHeader bgTransition={false} />
      <AppMain>
        <AppContainer>
          <AffiliateDashboardLayout>
            <CreateBrandForm />
          </AffiliateDashboardLayout>
        </AppContainer>
      </AppMain>
    </>
  );
}