import Head from '@/modules/components/Head';
import AffiliateDashboardLayout from '@/layouts/AffiliateDashgoardLayout';
import Provider from '@/components/admin/items/Provider';
import React, { useEffect, useState } from 'react';
import { Heading, Pagination, Spacer } from '@growth-ui/react';
// import { useGetAffiliateItemsForAdminDashboardLazyQuery } from '@/services';
import MyCoupon from './myCoupon';
import AppMain from '@/layouts/AppMain';

const TAKE = 20;

export default function CouponDashboard() {
  const [ sortBy, setSortBy ] = useState('createdAt, desc');
  const [ activePage, setActivePage ] = useState(1)
  // const [ query, { data, loading }] = useGetAffiliateItemsForAdminDashboardLazyQuery({});

  // useEffect(() => {
  //     query({
  //         data: {
  //             take: TAKE,
  //             sortBy,
  //             skip: (activePage - 1) * TAKE,
  //         }
  //     });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [activePage, sortBy]);

  const handlePageChange = (_: any, { activePage }: any) => {
      setActivePage(activePage);
  };
  
  return (
    <MyCoupon />
  );
}
