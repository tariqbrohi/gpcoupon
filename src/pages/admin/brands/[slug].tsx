import AdminLayout from '@/layouts/AdminLayout';
import Provider from '@/components/admin/brands/Provider';
import React from 'react';
import UpdateBrandFrom from '@/components/admin/brands/EditBrandForm';

export default function Brand() {
  return (
    <>
      <AdminLayout>
        <Provider>
          <UpdateBrandFrom />
        </Provider>
      </AdminLayout>
    </>
  );
}
