import AdminLayout from '@/layouts/AdminLayout';
import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import AdminDashboard from './adminDashboard';

export default withPageAuthRequired(function index() {
  return (
    <>
      {/* <AdminLayout>This is changed for sure!!!</AdminLayout> */}

      <AdminDashboard />
    </>
  );
});
