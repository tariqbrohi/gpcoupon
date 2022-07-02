import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Layout from '@/components/layout/AdminLayout';
import CouponForm from '@/components/admin/CouponForm';
import axios from 'axios';
import Router from 'next/router';
import { ROUTES } from '@/ROUTES';
import parseErrorMessage from '@/lib/parse-error-message';

export default withPageAuthRequired(function CreateCoupon() {
  const handleCreate = async (data: any) => {
    axios
      .post('/api/admin/coupons', data)
      .then(() => {
        alert('Success!');
        Router.push(ROUTES.admin.dashboard);
      })
      .catch((err) => {
        alert(parseErrorMessage(err));
      });
  };

  return (
    <Layout>
      <CouponForm btnText="Create" onSubmit={handleCreate} />
    </Layout>
  );
});
