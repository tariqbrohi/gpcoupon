import AppContext from '@/modules/components/AppContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';
import AppFooter from '@/layouts/AppFooter';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import CategoryList from '@/components/categories/CategoryList';
import Head from '@/modules/components/Head';
import Search from '@/modules/components/Search';
import { Paragraph, Spacer } from '@growth-ui/react';
// import BrandList from '@/components/brands/BrandList';
// import DashboardList from '@/components/affiliateDashboard/DashboardList';
import CouponList from '@/components/affiliateDashboard/CouponList';
// import { useGetAffiliateItemsForDashboardQuery, useGetAffiliateItemsForDashboardLazyQuery} from '@/services';

const TAKE = 10;

export default function AffiliateDashboard() {
  const { user, country } = useContext(AppContext);
  const [ sortBy, setSortBy ] = useState('createdAt,desc');
  // const [ query, { data, loading }] = useGetAffiliateItemsForDashboardLazyQuery({});

  // useEffect(() => {
  //   if (user !== null) {
  //     query({
  //       data: {
  //         country, 
  //         sub: user!.id,
  //         sortBy,
  //       }
  //     });
  //   }
  // }, [sortBy]);


  return (
    <>
      <Head title="GCoupon | AffiliateDashboard" />
      <AppHeader bgTransition={false} />
      {/* { data &&
        console.log('api call', data)} */}
      <AppMain>
        <AppContainer>
          <Paragraph fontWeight={700} fontSize={26}>
            My Coupon
          </Paragraph>
          <CouponList 
            tmpData={tmpData}
          />
        </AppContainer>
      </AppMain>
    </>
  );
}

const tmpData = {
  total: {
    count: 1,
    discount_sum: 80
  },
  data: [
  {
    name: "gyrodrop",
    Description: "tmp",
    creationDate: "07/08/2013",
    ExpireDate: "07/08/2023",
    originalPrice: 1000,
    discountedPrice: 80,
  }]};