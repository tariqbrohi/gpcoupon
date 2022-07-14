import AdminLayout from '@/layouts/AdminLayout';
import CreateBrandFrom from '@/components/admin/brands/CreateBrandFrom';
import Provider from '@/components/admin/brands/Provider';
import React from 'react';

export default function CreateBrand() {
  return (
    <>
      <AdminLayout>
        <Provider>
          <CreateBrandFrom />
        </Provider>
      </AdminLayout>
    </>
  );
}
