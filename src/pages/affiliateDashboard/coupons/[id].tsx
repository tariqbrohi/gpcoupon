import AffiliateDashboardLayout from '@/layouts/AffiliateDashgoardLayout';
import EditItemForm from '@/components/affiliateDashboard/conponRequest/EditItemForm';
import React from 'react';
import Head from '@/modules/components/Head';
import AppMain from '@/layouts/AppMain';
import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';

export default function EditCouponRequest() {
  return (
    <>
      <Head title='GPcoupon | Request Coupon' />
      <AppHeader bgTransition={false} />
      <AppMain>
        <AppContainer>
          <AffiliateDashboardLayout>
            <EditItemForm />
          </AffiliateDashboardLayout>
        </AppContainer>
      </AppMain>
    </>
  );
}
