import AppContext from '@/modules/components/AppContext';
import React, { useContext, useEffect, useState } from 'react';
import { Paragraph, Spacer, Pagination, Button, Container, Dropdown, Heading, Input, Select, DateInput } from '@growth-ui/react';
import { useGetAffiliateItemsByAffiliateForDashboardLazyQuery} from '@/services';
import styled from 'styled-components';
import MyCouponList from '@/components/affiliateDashboard/coupon/MyCouponsList';
import stringSimilarity from 'string-similarity';

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

export default function MyCoupon() {
  const { user } = useContext(AppContext);
  const [ activePage, setActivePage ] = useState(1);
  const [ startDate, setStartDate ] = useState('');
  const [ endDate, setEndDate ] = useState('');
  const [ status, setStatus ] = useState('ALL');
  const [ query, { data, loading }] = useGetAffiliateItemsByAffiliateForDashboardLazyQuery({});
  const [ couponName, setCouponName ] = useState('');

  const statusOption = [
    {
      key: "All",
      value: "ALL",
      text: "All",
    },
    {
      key: "Available",
      value: "AVAILABLE",
      text: "Available",
    },
    {
      key: "Unavailable",
      value: "UNAVAILABLE",
      text: "Unavailable",
    },
  ];

  useEffect(() => {
    if (user !== null) {
      if ((startDate !== '' && endDate) ==='' || (startDate === '' && endDate !== ''))
      {
        alert('Please submit From date and To date');
        return;
      }

      query({
        data: {
          take: TAKE,
          sub: user?.id,
          skip: (activePage - 1) * TAKE,
          startDate,
          endDate,
          status
        }
      });
    }
  }, [activePage, status]);

  const handleSearchButton = () => {
    if (user !== null) {
      if ((startDate !== '' && endDate) ==='' || (startDate === '' && endDate !== ''))
      {
        alert('Please submit From date and To date');
        return;
      }

      query({
        data: {
          take: TAKE,
          sub: user?.id,
          skip: (activePage - 1) * TAKE,
          startDate,
          endDate,
          status
        }
      });
    }
  }

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
          value={couponName}
          onChange={(e) => setCouponName(e.target.value)}
          style={{width: "50%"}} 
        />
        <Spacer size={20} />
        <LabelContainer>
        <Select 
          label='Status'
          value={statusOption[0].value}
          options={statusOption}
          onChange={(_, data)=>setStatus(data.newValues)}
        />
        </LabelContainer>
        <Spacer size={20} />

        <InputContainer>
        <div style={{display: "flex", }}>
          <DateInput
            mask="yyyy-mm-dd"
            renderInput={(params) => 
              <Input 
                {...params} 
                placeholder="yyyy-mm-dd" 
                label='From'
                // icon="calendar" 
                iconPosition='right' 
                style={{width: "50%"}}
              />
            }
            onChange={(_,date) => setStartDate(date)}
          />
          <Spacer size={46} />
          <DateInput
            mask="yyyy-mm-dd"
            renderInput={(params) => 
              <Input 
                {...params} 
                placeholder="yyyy-mm-dd" 
                label='To'
                // icon="calendar" 
                iconPosition='right' 
                style={{width: "50%"}}
              />
            }
            onChange={(_,date) => setEndDate(date)}
          />
        </div>
          <Button onClick={() => handleSearchButton()}>Search</Button>
        </InputContainer>
      </section>
      <Spacer size={30} />

      <div style={{border: "2px solid #D9D9D9"}}></div>

      <div style={{padding: "30px 0"}}>
          <MyCouponList 
            startDate = {startDate}
            endDate = {endDate}
            total = {data?.total}
            orders = {data?.orders
              ?.filter((o:any) => {
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
      <Spacer size={20} />
      <Pagination
        totalPages={Math.ceil((data?.total?.count || 1) / TAKE) }
        onPageChange={handlePageChange}
        activePage={activePage}
      />
    </>
  );
}