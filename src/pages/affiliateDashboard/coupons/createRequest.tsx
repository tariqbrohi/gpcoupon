import AffiliateDashboardLayout from '@/layouts/AffiliateDashgoardLayout';
import CreateItemForm from '@/components/affiliateDashboard/conponRequest/CreateItemForm';
import React from 'react';
import { Heading, Spacer } from '@growth-ui/react';
import ExcelToJson from '@/components/admin/ExcelToJson';
import Head from '@/modules/components/Head';
import AppMain from '@/layouts/AppMain';
import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';

export default function RequestCoupon() {
  return (
    <>
      <Head title='GPcoupon | Create Coupon' />
      <AppHeader bgTransition={false} />
      <AppMain>
        <AppContainer>
          <AffiliateDashboardLayout>
              <CreateItemForm />
              <Spacer size={20} />
              {/* <ExcelToJson /> */}
          </AffiliateDashboardLayout>
        </ AppContainer>
      </AppMain>
    </>
  );
}