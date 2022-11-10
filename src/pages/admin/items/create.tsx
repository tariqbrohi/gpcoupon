import AdminLayout from '@/layouts/AdminLayout';
import CreateItemForm from '@/components/admin/items/CreateItemForm';
import Provider from '@/components/admin/items/Provider';
import React from 'react';
import { Heading, Spacer } from '@growth-ui/react';
import ExcelToJson from '@/components/admin/ExcelToJson';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from '@/modules/components/Head';
import AppMain from '@/layouts/AppMain';

export default withPageAuthRequired(function CreateItem() {
  return (
    <>
      <Head title='GPcoupon | Request Coupon' />
      <AppMain>
        <AdminLayout>
          <Provider>
            <CreateItemForm />
            <Spacer size={20} />
            <ExcelToJson />
          </Provider>
        </AdminLayout>
      </AppMain>
    </>
  );
});
