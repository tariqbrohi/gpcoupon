import AdminLayout from '@/layouts/AdminLayout';
import EditItemForm from '@/components/admin/items/EditItemForm';
import Provider from '@/components/admin/items/Provider';
import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(function Item() {
  return (
    <>
      <AdminLayout>
        <Provider>
          <EditItemForm />
        </Provider>
      </AdminLayout>
    </>
  );
});
