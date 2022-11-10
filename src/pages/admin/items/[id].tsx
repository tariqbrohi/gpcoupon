import AdminLayout from '@/layouts/AdminLayout';
import EditItemForm from '@/components/admin/items/EditItemForm';
import Provider from '@/components/admin/items/Provider';
import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from '@/modules/components/Head';
import AppMain from '@/layouts/AppMain';

export default withPageAuthRequired(function Item() {
  return (
    <>
      <Head title='GPcoupon | Request Coupon' />
      <AppMain>
        <AdminLayout>
          <Provider>
            <EditItemForm />
          </Provider>
        </AdminLayout>
      </AppMain>
    </>
  );
});
