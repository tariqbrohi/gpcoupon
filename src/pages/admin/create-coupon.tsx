import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Layout from '@/components/layout/AdminLayout';
import CouponForm from '@/components/admin/CouponForm';
import CreateCouponForm from '@/components/admin/CreateCouponForm';
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
      <CouponForm
        btnText="Create"
        onSubmit={handleCreate}
        state={{
          description: `1. Visit the nearest Home Depot outlet near you and inquire if they accept gift cards (vouchers) or visit the website. 

2. Choose your preferred products.

3. At checkout, use the Gift Card (voucher) to redeem.`,
        }}
      />
      {/* <CreateCouponForm /> */}
    </Layout>
  );
});
