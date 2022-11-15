import AppContext from '@/modules/components/AppContext';
import React, { useContext, useEffect, useState } from 'react';
import { Paragraph, Spacer, Pagination, Button, Container, Dropdown, Heading, Input } from '@growth-ui/react';
// import { useGetAffiliateItemsForDashboardQuery, useGetAffiliateItemsForDashboardLazyQuery} from '@/services';
import styled from 'styled-components';
import MyCouponList from '@/components/affiliateDashboard/MyCouponsList';

const TAKE = 20;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  width: 100px;
`;

export default function MyCoupon() {
  const { user } = useContext(AppContext);
  const [ sortBy, setSortBy ] = useState('createdAt,desc');
  const [ activePage, setActivePage ] = useState(1)
  // const [ query, { data, loading }] = useGetAffiliateItemsForDashboardLazyQuery({});
  const [search, setSearch] = useState('');
  const status = [
    {value: "ALL"},
    {value: "AVAILABLE"},
    {value: "UNAVAILABLE"},
  ];

  // useEffect(() => {
  //   if (user !== null) {
  //     query({
  //       data: {
  //         take: TAKE,
  //         sub: user?.id,
  //         sortBy,

  //         skip: (activePage - 1) * TAKE,
  //       }
  //     });
  //   }
  // }, [activePage, sortBy]);


  const handlePageChange = (_: any, { activePage }: any) => {
    setActivePage(activePage);
  };

  return (
    <>
      <Heading as="h2" style={{color: "#2D126D"}}>
          My Coupons
      </Heading>
      <Spacer size={20} />

      <section>
        <Input 
          label='Coupon Name' 
          icon="search outline"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{width: "50%"}} 
        />
        <Spacer size={20} />

        <LabelContainer>
          <div style={{display: "flex", }}>
            <Input label='Create Date' placeholder='From' icon="calendar" iconPosition='right' style={{width: "50%"}} />
            <Spacer size={46} />
            <Input label='Create Date' placeholder='To' icon="calendar" iconPosition='right' style={{width: "50%"}} />
          </div>
        </LabelContainer>
        <Spacer size={20} />

        <LabelContainer>
          <Label>Status</Label>
          <Spacer size={10} />
          <Dropdown
            defaultValue={status[0].value}
            direction="left"
            options={status}
          />
        </LabelContainer>
      </section>
      <Spacer size={30} />

      <div style={{border: "2px solid #D9D9D9"}}></div>

      <div style={{padding: "30px 0"}}>
          <MyCouponList />
      </div>
      <Spacer size={20} />
      {/* <Pagination
        totalPages={Math.ceil((data?.total?.count || 1) / TAKE) }
        onPageChange={handlePageChange}
        activePage={activePage}
      /> */}
    </>
  );
}