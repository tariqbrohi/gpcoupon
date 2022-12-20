/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useContext, useEffect } from 'react';
import stringSimilarity from 'string-similarity';
import { Button, Chip, Heading, Image, Input, Select, Spacer, Table, Pagination, DateInput } from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import { useGetBrandsByAffiliateLazyQuery } from '@/services';
import Head from '@/modules/components/Head';
import AffiliateDashboardLayout from '@/layouts/AffiliateDashgoardLayout';
import AppMain from '@/layouts/AppMain';
import styled from 'styled-components';
import Link from 'next/link';
import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';
import AppContext from '@/modules/components/AppContext';
import { useRouter } from 'next/router';
import Router from 'next/router';

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BtnCreate = styled(Button)`
  min-width: 172px;
  font-weight: 600;
  font-size: 18px;
  padding: 10px 35px;
  border-radius: 30px;
  border 1px solid transparent;
  box-shadow: rgb(203 203 203) 4px 4px 8px;
  background-color: #FBD9D8;
  color: #BF7582;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-color: #F6A5A5;
    color: #fff;
  }

  ${({ theme }) => theme.gui.media.custom(1920)} {
    font-size: 14px;
  }

  ${({ theme }) => theme.gui.media.mobile} {
    font-size: 12px;
  }
`;

const TableHeadCell = styled(Table.HeadCell)`
  text-align: center;
`;

const TableCell = styled(Table.Cell)`
  text-align: center;
`;

const TableCellLink = styled(Table.Cell)`
  cursor: pointer;
  color: #4183c4;
  text-align: center;
  transition: all 0.4s ease-in-out;

  &:hover {
      color: #2D126D;
      text-decoration: underline;
  }
`;

const ChipCustom = styled(Chip)`
  text-align: center;
  margin: 0 auto;
`;

const ChipCategories = styled(Chip)`
  text-align: center;

  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;


export default function Brands() {
  const { user } = useContext(AppContext);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('ALL');
  const [brandName, setBrandName] = useState('');
  const [query, { data, loading }] = useGetBrandsByAffiliateLazyQuery({});

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

  useEffect(() => {
    if (user !== null) {
      if ((startDate !== '' && endDate ==='') || (startDate === '' && endDate !== ''))
      {
        alert('Please submit From date and To date');
        return;
      }

      query({
        data: {
          sub: user?.id,
          startDate,
          endDate,
          status
        }
      });
    }
  }, [status]);

  return (
    <>
      <Head title='GPcoupon | List Brand' />
      <AppHeader bgTransition={false} />
      <AppMain>
        <AppContainer>
          <AffiliateDashboardLayout>
          <section>
            <Heading style={{color: "#2D126D"}}>My Brands</Heading>
            <Spacer size={20} />

              <LabelContainer style={{justifyContent: "space-between"}}>
                <Input
                  label="Brand Name"
                  icon="search outline"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  style={{width: "50%"}}
                />

                <Link href={ROUTES.affiliateCreateBrands}>
                  <a>
                    <BtnCreate>Create Brand</BtnCreate>
                  </a>
                </Link>   
              </LabelContainer>
              <Spacer size={20} />
              <LabelContainer>
                {/* <div style={{display: "flex", width: "50%", justifyContent: "space-between"}}>
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
                </div> */}
              </LabelContainer>
              <Spacer size={20} />

              <LabelContainer>
                <Select 
                  label='Status'
                  value={statusOption[0].value}
                  options={statusOption}
                  style={{minWidth: "13em"}}
                  onChange={(_, data) => setStatus(data.newValues)}
                />
              </LabelContainer>
            </section>
            <Spacer size={30} />

            <div style={{border: "2px solid #D9D9D9"}}></div>
            <Spacer size={30} />

            <Table celled>
              <Table.Head>
                <Table.Row>
                  <TableHeadCell>Logo</TableHeadCell>
                  <TableHeadCell>Brand Name</TableHeadCell>
                  <TableHeadCell>GPoint Wallet Username</TableHeadCell>
                  <TableHeadCell>Countries</TableHeadCell>
                  <TableHeadCell>Categories</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell>Create Date</TableHeadCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                {data?.brands
                  ?.filter((brand: any) => {
                    if (!brandName) return true;
                  
                    const similarity = stringSimilarity.compareTwoStrings(
                      brand.name,
                      brandName,
                    );
                    
                    if (similarity > 0.25) return true;
                    
                    return false;
                  })
                  .map((brand: any) => (
                    <Table.Row key={brand.id}>
                      <TableCell>
                        <Image size='mini' src={brand.thumbnailUrl} />
                      </TableCell>
                      <TableCellLink 
                        onClick={() => Router.push(`${ROUTES.affiliateBrands}/${brand.id}`)}
                      >
                        {brand.name}                       
                      </TableCellLink>
                      <TableCell>
                        {user?.username}
                      </TableCell>
                      <TableCell>
                        <ChipCustom text={brand.countries.join(', ')} />
                      </TableCell>
                      <TableCell>
                        {
                          brand.categories.map((c: any, index: number) => (
                            <ChipCategories key={index} text={c.name} />
                          ))
                        }
                      </TableCell>
                      <TableCell>
                        <ChipCustom text={brand.status} outlined color={brand.status === 'AVAILABLE' ? 'primary' : 'red-400'} style={{margin: "0 auto"}} />
                      </TableCell>
                      <TableCell>
                        {new Date(Number(brand.createdAt)).toLocaleDateString()}
                      </TableCell>
                    </Table.Row>
                  ))
                }
              </Table.Body>
            </Table>
          </AffiliateDashboardLayout>
        </AppContainer>
      </AppMain>
    </>
  );
}
