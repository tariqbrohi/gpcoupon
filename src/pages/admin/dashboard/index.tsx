import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Layout from '@/components/layout/AdminLayout';

export default withPageAuthRequired(function Dashboard() {
  return <Layout>wow</Layout>;
});
