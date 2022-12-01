import AppContext from '@/modules/components/AppContext';
import React, { useContext, useEffect, useState } from 'react';
import { Spacer, Pagination, Button, Heading, Select } from '@growth-ui/react';
import { useGetItemForCouponDetailDashboardLazyQuery} from '@/services';
import styled from 'styled-components';
import CouponList from '@/components/affiliateDashboard/DetailCouponList';
import AppHeader from '@/layouts/AppHeader';
import AppContainer from '@/layouts/AppContainer';
import Head from '@/modules/components/Head';
import AffiliateDashboardLayout from '@/layouts/AffiliateDashgoardLayout';
import AppMain from '@/layouts/AppMain';
import { useRouter } from 'next/router';

const TAKE = 20;

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`

export default function CouponDetails() {
  const { user } = useContext(AppContext);
  const [ activePage, setActivePage ] = useState(1);
  const [ status, setStatus ] = useState('all');
  const [ query, { data, loading }] = useGetItemForCouponDetailDashboardLazyQuery({});
  const router = useRouter();
  const {startDate, endDate, slug } = router.query;
  
  const statusOption = [
    {
      key: "all",
      value: "all",
      text: "ALL",
    },
    {
      key: "used",
      value: "used",
      text: "USED",
    },
    {
      key: "expired",
      value: "expired",
      text: "EXPIRED",
    },
    {
      key: "available",
      value: "available",
      text: "UNUSED",
    }
  ];

  useEffect(() => {
    if (user !== null) {
      query({
        data: {
          take: TAKE,
          skip: (activePage - 1) * TAKE,
          slug: slug as string,
          startDate: startDate as string,
          endDate: endDate as string,
          status
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, status]);

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
            <Heading as="h2" style={{color: "#2D126D"}}>
              Coupon Details
            </Heading>
            <Spacer size={20} />
            <DetailContainer>
              <Select 
                label='Status'
                value={statusOption[0].value}
                options={statusOption}
                onChange={(_, data)=>setStatus(data.newValues)}
              />
              <ButtonContainer>
                <Button onClick={() => router.back()}>Back</Button>
              </ButtonContainer>
            </DetailContainer>
            <Spacer size={20} />
            <div style={{border: "2px solid #D9D9D9"}}></div>
            <div style={{padding: "30px 0"}}>
              <CouponList 
                result = {data}
                status = {status}
              />
            </div>
            <Spacer size={20} />
            <Pagination
              totalPages={Math.ceil((data?.totalCount || 1) / TAKE) }
              onPageChange={handlePageChange}
              activePage={activePage}
            />
          </AffiliateDashboardLayout>
        </AppContainer>
      </AppMain>
    </>
  );
}