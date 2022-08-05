import AdminLayout from '@/layouts/AdminLayout';
import CreateBrandFrom from '@/components/admin/brands/CreateBrandFrom';
import Provider from '@/components/admin/brands/Provider';
import React from 'react';
import withAdminPageRequired from '@/lib/hoc/with-admin-page-required';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(function CreateBrand() {
  return (
    <>
      <AdminLayout>
        <Provider>
          <CreateBrandFrom />
        </Provider>
      </AdminLayout>
    </>
  );
});
