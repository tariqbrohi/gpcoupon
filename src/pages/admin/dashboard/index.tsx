import Layout from '@/components/layout/AdminLayout';
import React from 'react';
import axios from 'axios';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { claimOneOf } from '@/lib/permissions';
import { NextPageContext } from 'next';

export default withPageAuthRequired(function Dashboard(props) {
  console.log(props);
  return <Layout>wow</Layout>;
});

export const getServerSideProps = async ({ req, res }: NextPageContext) => {
  const roles = getSession(req!, res!)?.user?.[
    'https://gpointwallet.com/roles'
  ];

  if (!claimOneOf(['manager'], roles)) {
    return {
      props: {
        error: 'error',
      },
    };
  }

  return { props: {} };
};
