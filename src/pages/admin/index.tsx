import AdminLayout from '@/layouts/AdminLayout';
import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(function index() {
  return (
    <>
      <AdminLayout>This is changed for sure!!!</AdminLayout>
    </>
  );
});
