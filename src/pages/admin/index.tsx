import AdminLayout from '@/layouts/AdminLayout';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from 'react';

export default withPageAuthRequired(function index() {
  return (
    <>
      <AdminLayout>hi</AdminLayout>
    </>
  );
});
