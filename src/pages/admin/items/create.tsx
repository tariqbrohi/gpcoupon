import AdminLayout from '@/layouts/AdminLayout';
import CreateItemForm from '@/components/admin/items/CreateItemForm';
import Provider from '@/components/admin/items/Provider';
import React from 'react';
import { Heading, Spacer } from '@growth-ui/react';
// import ExcelToJson from '@/components/admin/ExcelToJson';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(function CreateItem() {
  return (
    <>
      <AdminLayout>
        <Provider>
          <Heading as="h2">Create Item</Heading>
          <CreateItemForm />
          <Spacer size={20} />
          {/* <ExcelToJson /> */}
        </Provider>
      </AdminLayout>
    </>
  );
});
