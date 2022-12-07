/* eslint-disable jsx-a11y/alt-text */
import AdminLayout from '@/layouts/AdminLayout';
import React, { useContext, useEffect, useState } from 'react';
import stringSimilarity from 'string-similarity';
import { Button, Chip, DateInput, Heading, Image, Input, Pagination, Select, Spacer, Table } from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import { useGetBrandsByAffiliateForAdminDashboardLazyQuery, useGetBrandsByAffiliateForAdminDashboardQuery } from '@/services';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from '@/modules/components/Head';
import AppMain from '@/layouts/AppMain';
import styled from 'styled-components';
import Link from 'next/link';
import Provider from '@/components/admin/brands/Provider';
import { useRouter } from 'next/router';
import Router from 'next/router';
import AppContext from '@/modules/components/AppContext';

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%:
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

const TAKE = 20;

export default withPageAuthRequired(function Brands() {
  const { user } = useContext(AppContext);
  // const [sortBy, setSortBy] = useState('createdAt, desc');
  // const [activePage, setActivePage] = useState(1);
  const [searchBrand, setSearchBrand] = useState('');
  const [searchMerchant, setSearchMerchant] = useState('');
  const router = useRouter();
  const [ status, setStatus ] = useState('ALL');
  const {startDate, endDate } = router.query;
  // const [ startDate, setStartDate ] = useState('');
  // const [ endDate, setEndDate ] = useState('');

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

  // const { data: brands } = useGetBrandsByAffiliateForAdminDashboardQuery({
  //   data: {
  //     startDate: startDate as string,
  //     endDate: endDate as string,
  //     affiliate: true,
  //     status,
  //   }
  // });

  const [query, { data, loading }] = useGetBrandsByAffiliateForAdminDashboardLazyQuery({});

  useEffect(() => {
    query({
      data: {
        startDate: startDate as string,
        endDate: endDate as string,
        affiliate: true,
        status,
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[status]);

  // const handleSearchButton = () => {
  //   if ((startDate !== '' && endDate) === '' || (startDate === '' && endDate !== '')) {
  //     alert('Please submit From date and To date');

  //     return;
  //   }

  //   query({
  //     data: {
  //       startDate: startDate as string,
  //       endDate: endDate as string,
  //       affiliate: true,
  //       status,
  //     }
  //   });
  // }

  // const handlePageChange = (_: any, { activePage }: any) => {
  //   setActivePage(activePage);
  // };

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
                  value={searchBrand}
                  onChange={(e) => setSearchBrand(e.target.value)}
                  style={{width: "50%"}}
                />

                <Link href={ROUTES.admin.createBrand}>
                  <a>
                    <BtnCreate>Create Brand</BtnCreate>
                  </a>
                </Link>   
              </LabelContainer>
              <Spacer size={20} />

              <LabelContainer>
                <Input
                  label="Merchant Name"
                  icon="people"
                  value={searchMerchant}
                  onChange={(e) => setSearchMerchant(e.target.value)}
                  style={{width: "50%"}}
                />
              </LabelContainer>
              <Spacer size={20} />

              <LabelContainer>
                <Select 
                  label='Status'
                  value={statusOption[0].value}
                  options={statusOption}
                  onChange={(_, data) => setStatus(data.newValues)}
                  // style={{minWidth: "13em"}}
                  style={{width: "50%"}}
                />
              </LabelContainer>
              <Spacer size={20} />

              {/* <LabelContainer>
                <div style={{display: "flex", width: "50%", justifyContent: "space-between"}}>
                  <Input label='Create Date' placeholder='From' icon="calendar" iconPosition='right' />
                  <Input label='Create Date' placeholder='To' icon="calendar" iconPosition='right' />
                </div>
              </LabelContainer> */}

              {/* <DateContainer>
                <LabelContainer style={{justifyContent: "space-between"}}>
                  <DateInput
                    mask="yyyy-mm-dd"
                    renderInput={(params) => 
                      <Input 
                        {...params} 
                        placeholder="yyyy-mm-dd" 
                        label='From'
                        // icon="calendar" 
                        // iconPosition='right' 
                        style={{width: "30%"}}
                      />
                    }
                    onChange={(_, date) => setStartDate(date)}
                  />

                  <DateInput
                    mask="yyyy-mm-dd"
                    renderInput={(params) => 
                      <Input 
                        {...params} 
                        placeholder="yyyy-mm-dd" 
                        label='To'
                        // icon="calendar" 
                        // iconPosition='right' 
                        style={{width: "30%"}}
                      />
                    }
                    onChange={(_, date) => setEndDate(date)}
                  />
                  <Button rounded onClick={() => handleSearchButton()}>
                    Search
                  </Button>
                </LabelContainer>
              </DateContainer> */}
            </section>
            <Spacer size={30} />

            <div style={{border: "2px solid #D9D9D9"}}></div>
            <Spacer size={30} />

            <Provider>
              <Table celled>
                <Table.Head>
                  <Table.Row>
                    <TableHeadCell>Logo</TableHeadCell>
                    <TableHeadCell>Brand Name</TableHeadCell>
                    <TableHeadCell>Merchant Name</TableHeadCell>
                    <TableHeadCell>GP Wallet Business Username</TableHeadCell>
                    <TableHeadCell>Countries</TableHeadCell>
                    <TableHeadCell>Categories</TableHeadCell>
                    <TableHeadCell>Status</TableHeadCell>
                    <TableHeadCell>Create Date</TableHeadCell>
                  </Table.Row>
                </Table.Head>

                <Table.Body>
                  {data
                    ?.filter(({ name }:any) => {
                      if (!searchBrand) return true;
                    
                      const similarity = stringSimilarity.compareTwoStrings(
                        name,
                        searchBrand,
                      );
                      
                      if (similarity > 0.25) return true;
                      
                      return false;
                    })
                    .map((brand: any) => (
                      <Table.Row key={brand.id}>
                        <TableCell>
                          <Image size='small' src={brand.thumbnailUrl} />
                        </TableCell>
                        <TableCellLink 
                          onClick={() => Router.push(`${ROUTES.admin.brands}/${brand.id}`)}
                        >
                          {brand.name}                       
                        </TableCellLink>
                        <TableCell>
                          Merchant Name
                          {/* {user?.userName} */}
                        </TableCell>
                        <TableCell>
                          GP Wallet Business Username
                        </TableCell>
                        <TableCell>
                          <ChipCustom text={brand.countries.join(', ')} />
                        </TableCell>
                        <TableCell>
                          {brand.categories.map((c: any, index:number) => (
                            <ChipCategories key={index} text={c.name} />
                          ))}
                        </TableCell>
                        <TableCell>
                          <ChipCustom text={brand.status} outlined color={brand.status === 'AVAILABLE' ? 'primary' : 'red-400'} />
                        </TableCell>
                        <TableCell>
                          {new Date(Number(brand.createdAt)).toLocaleDateString()}
                        </TableCell>
                      </Table.Row>
                    ))
                  }
                </Table.Body>
              </Table>
            </Provider>
            <Spacer size={20} />
            
            {/* <Pagination
              totalPages={Math.ceil((brands?.brands || 1) / TAKE) }
              onPageChange={handlePageChange}
              activePage={activePage}
            /> */}
          </AdminLayout>
        </AppMain>
    </>
  );
});
