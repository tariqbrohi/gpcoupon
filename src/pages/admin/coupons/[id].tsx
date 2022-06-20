import React, { useEffect, useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Layout from '@/components/layout/AdminLayout';
import useAxios from 'axios-hooks';
import CouponForm from '@/components/admin/CouponForm';
import Router, { useRouter } from 'next/router';
import { omit } from 'lodash';
import axios from 'axios';
import { ROUTES } from '@/ROUTES';

export default withPageAuthRequired(function Brand() {
  const { query } = useRouter();
  const [{ data }] = useAxios({
    method: 'get',
    url: `/api/admin/coupons/${query.id}`,
  });

  const handleSubmit = async (data: any) => {
    console.log(omit(data, ['id', 'createdAt', 'updatedAt', 'createdBy']));

    axios
      .put(
        `/api/admin/coupons/${query.id}`,
        omit(data, ['id', 'createdAt', 'updatedAt', 'createdBy']),
        { withCredentials: true },
      )
      .then(() => Router.push(ROUTES.admin.dashboard))
      .catch((err) =>
        alert(
          err?.message ||
            'Something went wrong. Refresh window and please try again.',
        ),
      );
  };

  return (
    <Layout>
      {data && (
        <CouponForm
          state={data as any}
          btnText="Edit"
          onSubmit={handleSubmit}
        />
      )}
    </Layout>
  );
});
