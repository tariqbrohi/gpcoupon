import Head from '@/modules/components/Head';
import AdminLayout from '@/layouts/AdminLayout';
import Provider from '@/components/admin/items/Provider';
import React, { useEffect, useState } from 'react';
import {
  Button,
  DateInput,
  Heading,
  Input,
  Pagination,
  Select,
  Spacer,
} from '@growth-ui/react';
import {
  useGetAffiliateItemsByAffiliateForAdminDashboardLazyQuery,
  useGetAffiliateItemsForAdminDashboardLazyQuery,
} from '@/services';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import AdminDashboards from './adminDashboard/dashboards';
import AppMain from '@/layouts/AppMain';
import styled from 'styled-components';
import stringSimilarity from 'string-similarity';
import { useRouter } from 'next/router';

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%:
`;

const statusOption = [
  {
    key: 'All',
    value: 'ALL',
    text: 'All',
  },
  {
    key: 'Available',
    value: 'AVAILABLE',
    text: 'Available',
  },
  {
    key: 'Unavailable',
    value: 'UNAVAILABLE',
    text: 'Unavailable',
  },
];

const TAKE = 20;

export default withPageAuthRequired(function AdminDashboard() {
  const router = useRouter();
  const [activePage, setActivePage] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [couponName, setCouponName] = useState('');
  const [status, setStatus] = useState('ALL');
  const [query, { data, loading }] =
    useGetAffiliateItemsForAdminDashboardLazyQuery({});
  // const [ query, { data, loading }] = useGetAffiliateItemsByAffiliateForAdminDashboardLazyQuery({}); 삭제시 api 도 같이 지워주기

  useEffect(() => {
    query({
      data: {
        take: TAKE,
        skip: (activePage - 1) * TAKE,
        startDate,
        endDate,
        status,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, status]);

  const handleSearchButton = () => {
    if (
      (startDate !== '' && endDate === '') ||
      (startDate === '' && endDate !== '')
    ) {
      alert('Please submit From date and To date');

      return;
    }

    query({
      data: {
        take: TAKE,
        skip: (activePage - 1) * TAKE,
        startDate,
        endDate,
        status,
      },
    });
  };

  // const handleReset = () => {
  //   setCouponName('');
  //   setStartDate('');
  //   setEndDate('');

  //   console.log('name: ', couponName);
  //   console.log('start: ', startDate);
  //   console.log('end: ', endDate);

  //   router.reload();
  // }

  const handlePageChange = (_: any, { activePage }: any) => {
    setActivePage(activePage);
  };

  return (
    <>
      <Head title="GPcoupon | Admin Dashboard" />
      <AppMain>
        <AdminLayout>
          <Provider>
            <Heading as="h2" style={{ color: '#2D126D' }}>
              Coupon Dashboard
            </Heading>
            <Spacer size={20} />

            <section>
              <LabelContainer>
                <Input
                  label="Coupon Name"
                  // label='Merchant Name'        // Should changed to this search name later
                  icon="search outline"
                  value={couponName}
                  onChange={(e) => setCouponName(e.target.value)}
                  style={{ width: '50%' }}
                />
              </LabelContainer>
              <Spacer size={20} />

              <LabelContainer>
                <Select
                  label="Status"
                  value={statusOption[0].value}
                  options={statusOption}
                  onChange={(_, data) => setStatus(data.newValues)}
                  style={{ width: '50%' }}
                />
              </LabelContainer>
              <Spacer size={20} />

              <DateContainer>
                <LabelContainer style={{ justifyContent: 'space-between' }}>
                  <DateInput
                    mask="yyyy-mm-dd"
                    renderInput={(params) => (
                      <Input
                        {...params}
                        placeholder="yyyy-mm-dd"
                        label="From"
                        // icon="calendar"
                        // iconPosition='right'
                        style={{ width: '30%' }}
                      />
                    )}
                    onChange={(_, date) => setStartDate(date)}
                  />

                  <DateInput
                    mask="yyyy-mm-dd"
                    renderInput={(params) => (
                      <Input
                        {...params}
                        placeholder="yyyy-mm-dd"
                        label="To"
                        // icon="calendar"
                        // iconPosition='right'
                        style={{ width: '30%' }}
                      />
                    )}
                    onChange={(_, date) => setEndDate(date)}
                  />
                  <Button rounded onClick={() => handleSearchButton()}>
                    Search
                  </Button>
                  {/* <Button rounded onClick={() => handleReset()}>
                    Reset
                  </Button> */}
                </LabelContainer>
              </DateContainer>
            </section>
            <Spacer size={30} />

            <div style={{ border: '2px solid #D9D9D9' }}></div>

            <div style={{ padding: '30px 0' }}>
              <AdminDashboards
                startDate={startDate}
                endDate={endDate}
                total={data?.total}
                orders={data?.orders?.filter((o: any) => {
                  if (!couponName) return true;

                  const similarity = stringSimilarity.compareTwoStrings(
                    o._id.name,
                    couponName,
                  );

                  if (similarity > 0.25) return true;

                  return false;
                })}
              />
            </div>
            <Spacer size={30} />

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

function e(e: any) {
  throw new Error('Function not implemented.');
}
