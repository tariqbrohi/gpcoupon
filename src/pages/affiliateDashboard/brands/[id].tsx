import AffiliateDashboardLayout from '@/layouts/AffiliateDashgoardLayout';
import React from 'react';
import UpdateBrandFrom from '@/components/affiliateDashboard/brand/EditBrandForm';
import Head from '@/modules/components/Head';
import AppMain from '@/layouts/AppMain';
import AppHeader from '@/layouts/AppHeader';
import AppContainer from '@/layouts/AppContainer';

export default function Brand() {
  return (
    <>
      <Head title='GPcoupon | Request Brand' />
      <AppHeader bgTransition={false} />
      <AppMain>
        <AppContainer>
          <AffiliateDashboardLayout>
            <UpdateBrandFrom />
          </AffiliateDashboardLayout>
        </AppContainer>
      </AppMain>
    </>
  );
}
