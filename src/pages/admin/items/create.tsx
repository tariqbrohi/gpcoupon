import AdminLayout from '@/layouts/AdminLayout';
import CreateItemForm from '@/components/admin/items/CreateItemForm';
import Provider from '@/components/admin/items/Provider';
import React from 'react';
import { Heading } from '@growth-ui/react';

export default function CreateItem() {
  return (
    <>
      <AdminLayout>
        <Provider>
          <Heading as="h2">Create Item</Heading>
          <CreateItemForm />
        </Provider>
      </AdminLayout>
    </>
  );
}
