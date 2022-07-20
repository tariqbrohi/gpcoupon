import AdminLayout from '@/layouts/AdminLayout';
import CreateBrandFrom from '@/components/admin/brands/CreateBrandFrom';
import Provider from '@/components/admin/brands/Provider';
import React from 'react';
import withAdminPageRequired from '@/lib/hoc/with-admin-page-required';

export default withAdminPageRequired([])(function CreateBrand() {
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
