import AdminLayout from '@/layouts/AdminLayout';
import React, { useState } from 'react';
import Router from 'next/router';
import stringSimilarity from 'string-similarity';
import { Dropdown, Heading, Input, List, Spacer } from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import { useGetBrandsQuery } from '@/services';
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

export default withPageAuthRequired(function Brands() {
  const { data: brands } = useGetBrandsQuery({
    data: {
      affiliate: true,
      status: 'ALL',
    },
  });

  const [searchBrand, setSearchBrand] = useState('');
  const [searchBusiness, setSearchBusiness] = useState('');

  const status = [
    {value: "All"},
    {value: "Active"},
    {value: "Inactive"},
  ];

  return (
    <>
      <Head title='GPcoupon | List Brand' />
      <AppMain>
        <AdminLayout>
          <section>
            <Heading style={{color: "#2D126D"}}>List Brand</Heading>
            <Spacer size={20} />

            <Input
              label="Brand Name"
              icon="search menu"
              value={searchBrand}
              onChange={(e) => setSearchBrand(e.target.value)}
              style={{width: "50%"}}
            />
            <Spacer size={20} />

            <Input
              label="Business Name"
              icon="search outline"
              value={searchBusiness}
              onChange={(e) => setSearchBusiness(e.target.value)}
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
            {brands
              ?.filter(({ name }) => {
                if (!searchBrand) return true;
              
                const similarity = stringSimilarity.compareTwoStrings(
                  name,
                  searchBrand,
                );
                
                if (similarity > 0.25) return true;
                
                return false;
              })
              .map((brand) => (
                <List.Item
                  key={brand.id}
                  onClick={() =>
                    Router.push(`${ROUTES.admin.brands}/${brand.id}`)
                  }
                >
                  <List.Image rounded src={brand.thumbnailUrl} size="mini" />
                  <List.Content>
                    <List.Heading>{brand.name}</List.Heading>
                    <List.Heading>{brand.countries}</List.Heading>
                  </List.Content>
                </List.Item>
              ))
            }
          </List>
        </AdminLayout>
      </AppMain>
    </>
  );
});
