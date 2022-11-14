import AppContext from '@/modules/components/AppContext';
import React, { useContext, useEffect, useState } from 'react';
import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';
import AppMain from '@/layouts/AppMain';
import Head from '@/modules/components/Head';
import { Paragraph, Spacer, Pagination, Button, Container } from '@growth-ui/react';
import CouponList from '@/components/affiliateDashboard/CouponList';
import { useGetAffiliateItemsForDashboardQuery, useGetAffiliateItemsForDashboardLazyQuery} from '@/services';
import CreateCouponRequest from '@/components/affiliateDashboard/CreateCouponModal';
import AppNav from '@/layouts/AppNav';

const TAKE = 20;

export default function AffiliateCouponDashboard() {
  const { user } = useContext(AppContext);
  const [ sortBy, setSortBy ] = useState('createdAt,desc');
  const [ activePage, setActivePage ] = useState(1)
  const [ query, { data, loading }] = useGetAffiliateItemsForDashboardLazyQuery({});

  useEffect(() => {
    if (user !== null) {
      query({
        data: {
          take: TAKE,
          sub: user?.id,
          sortBy,
          skip: (activePage - 1) * TAKE,
        }
      });
    }
  }, [activePage, sortBy]);


  const handlePageChange = (_: any, { activePage }: any) => {
    setActivePage(activePage);
  };

  return (
    <>
      <Head title="GPcoupon | Affiliate Coupon Dashboard" />
      <AppHeader bgTransition={false} />
      <AppMain>
        <AppContainer>
          <Paragraph fontWeight={700} fontSize={26}>
            My Coupon
          </Paragraph>
          {
            user &&
              <div
                style={{
                  display: "flex"
                }}
              >       
                <CreateCouponRequest/>
              </div>
          }
          <CouponList 
            orders={data}
          />
          <Pagination
            totalPages={Math.ceil((data?.total?.count || 1) / TAKE)}
            onPageChange={handlePageChange}
            activePage={activePage}
          />
        </AppContainer>
      </AppMain>
      <AppNav />
    </>
  );
}