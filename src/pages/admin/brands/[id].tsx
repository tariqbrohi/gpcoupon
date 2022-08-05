import AdminLayout from '@/layouts/AdminLayout';
import Provider from '@/components/admin/brands/Provider';
import React from 'react';
import UpdateBrandFrom from '@/components/admin/brands/EditBrandForm';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(function Brand() {
  return (
    <>
      <AdminLayout>
        <Provider>
          <UpdateBrandFrom />
        </Provider>
      </AdminLayout>
    </>
  );
});
