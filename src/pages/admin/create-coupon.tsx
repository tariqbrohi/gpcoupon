import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Layout from '@/components/layout/AdminLayout';
import CouponForm from '@/components/admin/CouponForm';
import axios from 'axios';
import Router from 'next/router';
import { ROUTES } from '@/ROUTES';
import parseErrorMessage from '@/lib/parse-error-message';
import { useCreateItemMutation } from '@/services';

export default withPageAuthRequired(function CreateCoupon() {
  const [create, { loading }] = useCreateItemMutation();

  const handleCreate = async (data: any) => {
    create({
      data,
    })
      .then(() => {
        Router.push(ROUTES.admin.dashboard);
      })
      .catch((err) => {});
  };

  return (
    <Layout>
      <CouponForm btnText="Create" onSubmit={handleCreate} />
    </Layout>
  );
});
