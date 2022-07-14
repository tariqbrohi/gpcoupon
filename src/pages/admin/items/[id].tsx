import AdminLayout from '@/layouts/AdminLayout';
import EditItemForm from '@/components/admin/items/EditItemForm';
import Provider from '@/components/admin/items/Provider';
import React from 'react';

export default function Item() {
  return (
    <>
      <AdminLayout>
        <Provider>
          <EditItemForm />
        </Provider>
      </AdminLayout>
    </>
  );
}
