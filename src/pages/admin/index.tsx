import AdminLayout from '@/layouts/AdminLayout';
import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import AdminDashboard from './adminDashboard';
import AppMain from '@/layouts/AppMain';

export default withPageAuthRequired(function index() {
  return (
    <>
      <AppMain>
        <AdminLayout>This is changed for sure!!!</AdminLayout>
      </AppMain>

      {/* <AdminDashboard /> */}
    </>
  );
});
