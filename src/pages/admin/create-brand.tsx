import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Layout from '@/components/layout/AdminLayout';
import CreateBrandForm from '@/components/admin/CraeteBrandForm';

export default withPageAuthRequired(function CreateBrand() {
  return (
    <Layout>
      <CreateBrandForm />
    </Layout>
  );
});
