import AdminLayout from '@/layouts/AdminLayout';
import Provider from '@/components/admin/brands/Provider';
import React from 'react';
import UpdateBrandFrom from '@/components/admin/brands/EditBrandForm';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from '@/modules/components/Head';
import AppMain from '@/layouts/AppMain';

export default withPageAuthRequired(function Brand() {
  return (
    <>
      <Head title='GPcoupon | Request Brand' />
      <AppMain>
        <AdminLayout>
          <Provider>
            <UpdateBrandFrom />
          </Provider>
        </AdminLayout>
      </AppMain>
    </>
  );
});
