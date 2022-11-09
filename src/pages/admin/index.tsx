import AdminLayout from '@/layouts/AdminLayout';
import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import AdminDashboard from './adminDashboard';
import AppMain from '@/layouts/AppMain';
import Head from '@/modules/components/Head';

export default withPageAuthRequired(function index() {
  return (
    <>
      <Head title='GPcoupon | Admin' />
      <AppMain>
        <AdminLayout>This is changed for sure!!!</AdminLayout>
      </AppMain>

      {/* <AdminDashboard /> */}
    </>
  );
});
