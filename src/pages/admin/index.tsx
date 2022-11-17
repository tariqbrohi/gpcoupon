/* eslint-disable react-hooks/rules-of-hooks */
import AdminLayout from '@/layouts/AdminLayout';
import React, { useEffect, useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import AppMain from '@/layouts/AppMain';
import Head from '@/modules/components/Head';
import Provider from '@/components/admin/items/Provider';
import { Heading, Pagination, Select, Spacer } from '@growth-ui/react';
import AdminDashboards from './adminDashboard/dashboards';
import { useGetAffiliateItemsForAdminDashboardLazyQuery } from '@/services';
import Input from '@growth-ui/react/elements/Input/Input';
import styled from 'styled-components';
import DashboardGroupBy from './adminDashboard/dashboardGroupBy';

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const statusOption = [
  {
    key: "ALL",
    value: "ALL",
    text: "ALL",
  },
  {
    key: "AVAILABLE",
    value: "AVAILABLE",
    text: "AVAILABLE",
  },
  {
    key: "UNAVAILABLE",
    value: "UNAVAILABLE",
    text: "UNAVAILABLE",
  },
];

const TAKE = 20;

export default withPageAuthRequired(function index() {
  const [search, setSearch] = useState('');
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
            <Heading as="h2" style={{color: "#2D126D"}}>
                Coupon Dashboard
            </Heading>
            <Spacer size={20} />

            <section>
              <LabelContainer>
                <Input 
                  label='Business Name' 
                  icon="search outline"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{width: "50%"}} 
                />
              </LabelContainer>
              <Spacer size={20} />

              <LabelContainer>
                <div style={{display: "flex", justifyContent: "space-between", width: "50%"}}>
                  <Input label='Create Date' placeholder='From' icon="calendar" iconPosition='right' />
                  <Input label='Create Date' placeholder='To' icon="calendar" iconPosition='right' />
                </div>
              </LabelContainer>
              <Spacer size={20} />

              <LabelContainer>
                <Select 
                  label='Status'
                  value={statusOption[0].value}
                  options={statusOption}
                  style={{minWidth: "13em"}}
                />
              </LabelContainer>
            </section>
            <Spacer size={30} />

            <div style={{border: "2px solid #D9D9D9"}}></div>

            <div style={{padding: "30px 0"}}>
              <DashboardGroupBy orders={data} />
              {/* <AdminDashboards orders={data} /> */}
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
    </>
  );
});
