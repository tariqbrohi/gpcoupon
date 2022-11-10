import AdminLayout from '@/layouts/AdminLayout';
import CreateBrandFrom from '@/components/admin/brands/CreateBrandFrom';
import Provider from '@/components/admin/brands/Provider';
import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from '@/modules/components/Head';
import AppMain from '@/layouts/AppMain';

export default withPageAuthRequired(function CreateBrand() {
  return (
    <>
      <Head title='GPcoupon | Request Brand' />
      <AppMain>
        <AdminLayout>
          <Provider>
            <CreateBrandFrom />
          </Provider>
        </AdminLayout>
      </AppMain>
    </>
  );
});
