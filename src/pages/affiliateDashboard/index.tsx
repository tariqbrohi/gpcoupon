/* eslint-disable react-hooks/rules-of-hooks */
import AffiliateDashboardLayout from '@/layouts/AffiliateDashgoardLayout';
import React, { useEffect, useState } from 'react';
import AppMain from '@/layouts/AppMain';
import Head from '@/modules/components/Head';
import { Dropdown, Heading, Pagination, Spacer, Input } from '@growth-ui/react';
import CouponDashboard from './couponDashboard';
import MyCoupon from './couponDashboard/myCoupon';
import styled from 'styled-components';
import AppHeader from '@/layouts/AppHeader';
import AppContainer from '@/layouts/AppContainer';

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  width: 100px;
`;

const status = [
  {value: "All"},
  {value: "Active"},
  {value: "Inactive"},
];

const TAKE = 20;

export default function myDashboard() {
  const [search, setSearch] = useState('');
  const [ sortBy, setSortBy ] = useState('createdAt, desc');
  const [ activePage, setActivePage ] = useState(1)
  // const [ query, { data, loading }] = useGetAffiliateItemsForAdminDashboardLazyQuery({});
  
  // useEffect(() => {
  //   query({
  //     data: {
  //       take: TAKE,
  //       sortBy,
  //       skip: (activePage - 1) * TAKE,
  //     }
  //   });
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [activePage, sortBy]);

  const handlePageChange = (_: any, { activePage }: any) => {
    setActivePage(activePage);
  };

  return (
    <>
      <Head title='GPcoupon | AffiliateDashboard' />
      <AppHeader bgTransition={false} />
      <AppMain>
        <AppContainer>
          <AffiliateDashboardLayout>
            <CouponDashboard />
          </AffiliateDashboardLayout>
        </AppContainer>
      </AppMain>
    </>
  );
}
