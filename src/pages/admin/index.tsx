/* eslint-disable react-hooks/rules-of-hooks */
import AdminLayout from '@/layouts/AdminLayout';
import React, { useEffect, useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import AdminDashboard from './adminDashboard';
import AppMain from '@/layouts/AppMain';
import Head from '@/modules/components/Head';
import Provider from '@/components/admin/items/Provider';
import { Heading, Pagination, Spacer } from '@growth-ui/react';
import AdminDashboards from './adminDashboard/dashboards';
import { useGetAffiliateItemsForAdminDashboardLazyQuery } from '@/services';
import Input from '@growth-ui/react/elements/Input/Input';
import styled from 'styled-components';

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  width: 150px;
`;

const TAKE = 20;

export default withPageAuthRequired(function index() {
  const [ sortBy, setSortBy ] = useState('createdAt, desc');
  const [ activePage, setActivePage ] = useState(1)
  const [ query, { data, loading }] = useGetAffiliateItemsForAdminDashboardLazyQuery({});
  
  useEffect(() => {
    query({
      data: {
        take: TAKE,
        sortBy,
        skip: (activePage - 1) * TAKE,
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, sortBy]);

  const handlePageChange = (_: any, { activePage }: any) => {
    setActivePage(activePage);
  };

  return (
    <>
      <Head title='GPcoupon | Admin' />
      <AppMain>
        <AdminLayout>

          <Provider>
            <Heading as="h2">
                Coupon Dashboard
            </Heading>
            <Spacer size={20} />

            <section>
              <LabelContainer>
                <Label>Search</Label>
                <Input fluid />
              </LabelContainer>
              <Spacer size={20} />

              <LabelContainer>
                <Label>Create Date</Label>
                <Input fluid />
              </LabelContainer>
              <Spacer size={20} />

              <LabelContainer>
                <Label>Merchant Name</Label>
                <Input fluid />
              </LabelContainer>
              <Spacer size={20} />

              <LabelContainer>
                <Label>Status</Label>
                <Input fluid />
              </LabelContainer>
            </section>

            <div style={{padding: "50px 0"}}>
                <AdminDashboards orders={data} />
            </div>
            <Spacer size={20} />

            <Pagination
                totalPages={Math.ceil((data?.total?.count || 1) / TAKE)}
                onPageChange={handlePageChange}
                activePage={activePage}
            />
          </Provider>
        </AdminLayout>
      </AppMain>

      {/* <AdminDashboard /> */}
    </>
  );
});
