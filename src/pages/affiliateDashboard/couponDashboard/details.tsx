import AppContext from '@/modules/components/AppContext';
import React, { useContext, useEffect, useState } from 'react';
import { Paragraph, Spacer, Pagination, Button, Container, Dropdown, Heading, Input, Select, DateInput } from '@growth-ui/react';
import { useGetItemForCouponDetailDashboardLazyQuery} from '@/services';
import styled from 'styled-components';
import CouponList from '@/components/affiliateDashboard/DetailCouponList';
import stringSimilarity from 'string-similarity';
import AppHeader from '@/layouts/AppHeader';
import AppContainer from '@/layouts/AppContainer';
import Head from '@/modules/components/Head';
import AffiliateDashboardLayout from '@/layouts/AffiliateDashgoardLayout';
import AppMain from '@/layouts/AppMain';
import { useRouter } from 'next/router';

const TAKE = 20;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  width: 100px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`

export default function CouponDetails() {
  const { user } = useContext(AppContext);
  const [ activePage, setActivePage ] = useState(1);
  const [ status, setStatus ] = useState('ALL');
  const [ query, { data, loading }] = useGetItemForCouponDetailDashboardLazyQuery({});
  const [ couponName, setCouponName ] = useState('');
  const router = useRouter();
  const {startDate, endDate, slug } = router.query;

  useEffect(() => {
    if (user !== null) {
      query({
        data: {
          take: TAKE,
          skip: (activePage - 1) * TAKE,
          slug: slug as string,
          startDate: startDate as string,
          endDate: endDate as string,
        }
      });
    }
  }, [activePage]);

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
            <ButtonContainer>
              <Button onClick={() => router.back()}>Back</Button>
            </ButtonContainer>
            <Spacer size={20} />
            <div style={{border: "2px solid #D9D9D9"}}></div>
            <div style={{padding: "30px 0"}}>
                <CouponList 
                  // total = {data?.total}
                  gifts = {data?.gifts}
                />
            </div>
            <Spacer size={20} />
            <Pagination
              totalPages={Math.ceil((data?.gifts.length || 1) / TAKE) }
              onPageChange={handlePageChange}
              activePage={activePage}
            />
          </AffiliateDashboardLayout>
        </AppContainer>
      </AppMain>
    </>
  );
}