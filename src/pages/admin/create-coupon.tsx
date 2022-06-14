import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Layout from '@/components/layout/AdminLayout';
import CreateCouponForm from '@/components/admin/CreateCouponForm';

export default withPageAuthRequired(function CreateCoupon() {
  return (
    <Layout>
      <CreateCouponForm />
    </Layout>
  );
});
