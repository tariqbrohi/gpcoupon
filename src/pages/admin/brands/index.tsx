/* eslint-disable jsx-a11y/alt-text */
import AdminLayout from '@/layouts/AdminLayout';
import React, { useState } from 'react';
import Router from 'next/router';
import stringSimilarity from 'string-similarity';
import { Button, Heading, Image, Input, List, Select, Spacer, Table } from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import { useGetBrandsQuery } from '@/services';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from '@/modules/components/Head';
import AppMain from '@/layouts/AppMain';
import styled from 'styled-components';
import Link from 'next/link';
import Provider from '@/components/admin/brands/Provider';

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BtnCreate = styled(Button)`
  font-weight: 600;
  font-size: 18px;
  padding: 10px 35px;
  border-radius: 30px;
  box-shadow: rgb(203 203 203) 4px 4px 8px;
  background-color: #FBD9D8;
  color: #BF7582;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-color: #f4b2b0;
  }

  ${({ theme }) => theme.gui.media.custom(1920)} {
    font-size: 14px;
  }

  ${({ theme }) => theme.gui.media.mobile} {
    font-size: 12px;
  }
`;

const TableCellLink = styled(Table.Cell)`
  cursor: pointer;
  color: #4183c4;
  transition: all 0.4s ease-in-out;

  &:hover {
      color: #2D126D;
      text-decoration: underline;
  }
`;

export default withPageAuthRequired(function Brands() {
  const { data: brands } = useGetBrandsQuery({
    data: {
      affiliate: true,
      status: 'ALL',
    },
  });

  const [searchBrand, setSearchBrand] = useState('');
  const [searchMerchant, setSearchMerchant] = useState('');

  const statusOption = [
    {
      key: "ALL",
      value: "ALL",
      text: "ALL",
    },
    {
      key: "AVAILABLE",
      value: "AVAILABLE",
      text: "AVAILABLE",
    },
    {
      key: "UNAVAILABLE",
      value: "UNAVAILABLE",
      text: "UNAVAILABLE",
    },
  ];

  return (
    <>
      <Head title='GPcoupon | List Brand' />
        <AppMain>
          <AdminLayout>
            <section>
              <Heading style={{color: "#2D126D"}}>List Brand</Heading>
              <Spacer size={20} />

              <LabelContainer style={{justifyContent: "space-between"}}>
                <Input
                  label="Brand Name"
                  icon="search outline"
                  // icon="search menu"
                  value={searchBrand}
                  onChange={(e) => setSearchBrand(e.target.value)}
                  style={{width: "50%"}}
                />

                <Link href={ROUTES.admin.createBrand}>
                  <BtnCreate>Create Brand</BtnCreate>
                </Link>   

              </LabelContainer>
              <Spacer size={20} />

              <LabelContainer>
                <Input
                  label="Merchant Name"
                  icon="people"
                  // icon="search outline"
                  value={searchMerchant}
                  onChange={(e) => setSearchMerchant(e.target.value)}
                  style={{width: "50%"}}
                />
              </LabelContainer>
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
                <Select 
                  label='Status'
                  value={statusOption[0].value}
                  options={statusOption}
                />
              </LabelContainer>
            </section>
            <Spacer size={30} />

            <div style={{border: "2px solid #D9D9D9"}}></div>
            <Spacer size={30} />

            {/* <List selection verticalAlign="middle"> */}

            <Provider>
            
              <Table celled>
                <Table.Head>
                  <Table.Row>
                    <Table.HeadCell>Logo</Table.HeadCell>
                    <Table.HeadCell>Brand Name</Table.HeadCell>
                    <Table.HeadCell>Merchant Name</Table.HeadCell>
                    <Table.HeadCell>GP Wallet Business Username</Table.HeadCell>
                    <Table.HeadCell>Countries</Table.HeadCell>
                    <Table.HeadCell>Categories</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Create Date</Table.HeadCell>
                  </Table.Row>
                </Table.Head>

                <Table.Body>
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
                      <>
                        <Table.Row key={brand.id}>
                          <Table.Cell>
                            <Image size='mini' src={brand.thumbnailUrl} />
                          </Table.Cell>
                          <TableCellLink 
                            onClick={() => window.open(`${ROUTES.admin.brands}/${brand.id}`)}
                          >
                            {brand.name}                       
                          </TableCellLink>
                          <Table.Cell>
                            Merchant Name
                          </Table.Cell>
                          <Table.Cell>
                            GP Wallet Business Username
                          </Table.Cell>
                          <Table.Cell>
                            {brand.countries}
                          </Table.Cell>
                          <Table.Cell>
                            Categories
                            {/* {brand.categories} */}
                          </Table.Cell>
                          <Table.Cell>
                            {brand.status}
                          </Table.Cell>
                          <Table.Cell>
                            {new Date(Number(brand.createdAt)).toLocaleDateString()}
                          </Table.Cell>
                        </Table.Row>

                      {/* <List.Item
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
                      </List.Item> */}

                      </>
                    ))
                  }
                </Table.Body>
              </Table>
            </Provider>
            {/* </List> */}
          </AdminLayout>
        </AppMain>
    </>
  );
});
