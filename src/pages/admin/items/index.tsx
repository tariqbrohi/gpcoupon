import AdminLayout from '@/layouts/AdminLayout';
import React, { useState } from 'react';
import Router from 'next/router';
import stringSimilarity from 'string-similarity';
import { Dropdown, Heading, Input, List, Spacer } from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import { useGetItemsQuery } from '@/services';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from '@/modules/components/Head';
import AppMain from '@/layouts/AppMain';
import styled from 'styled-components';

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  width: 100px;
`;

export default withPageAuthRequired(function Items() {
  const { data: items } = useGetItemsQuery();
  const [searchCoupon, setSearchCoupon] = useState('');
  const [searchMerchant, setSearchMerchant] = useState('');

  const status = [
    {value: "All"},
    {value: "Active"},
    {value: "Inactive"},
  ];

  return (
    <>
      <Head title='GPcoupon | List Request Coupon' />
      <AppMain>
        <AdminLayout>
          <section>
            <Heading style={{color: "2D126D"}}>List Request Coupon</Heading>
            <Spacer size={20} />

            <Input
              // fluid
              label="Coupon Name"
              icon="search menu"
              value={searchCoupon}
              onChange={(e) => setSearchCoupon(e.target.value)}
              style={{width: "50%"}}
            />
            <Spacer size={20} />

            <Input
              label="Merchant Name"
              icon="search outline"
              value={searchMerchant}
              onChange={(e) => setSearchMerchant(e.target.value)}
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
          <Spacer size={30} />

          <List selection verticalAlign="middle">
            {items
              ?.filter(({ name }) => {
                if (!searchCoupon) return true;

                const similarity = stringSimilarity.compareTwoStrings(
                  name,
                  searchCoupon,
                );

                if (similarity > 0.25) return true;
                return false;
              })
              .map((item) => (
                <List.Item
                  key={item.id}
                  onClick={() => Router.push(`${ROUTES.admin.items}/${item.id}`)}
                >
                  <List.Image rounded src={item.imageUrls.small} size="mini" />
                  <List.Content>
                    <List.Heading>{item.name}</List.Heading>
                  </List.Content>
                </List.Item>
              ))}
          </List>
        </AdminLayout>
      </AppMain>
    </>
  );
});
