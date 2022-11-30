import Head from '@/modules/components/Head';
import AdminLayout from '@/layouts/AdminLayout';
import Provider from '@/components/admin/items/Provider';
import React, { useEffect, useState } from 'react';
import { Button, Calendar, DateInput, Heading, Input, Pagination, Select, Spacer } from '@growth-ui/react';
import { useGetAffiliateItemsByAffiliateForAdminDashboardLazyQuery, useGetAffiliateItemsForAdminDashboardLazyQuery } from '@/services';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import AdminDashboards from './dashboards';
import AppMain from '@/layouts/AppMain';
import styled from 'styled-components';
import stringSimilarity from 'string-similarity';
import Link from 'next/link';
import { ROUTES } from '@/ROUTES';

const LabelContainer = styled.div`
    display: flex;
    align-items: center;
`;

const DateContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%:
`;

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

const DetailBtn = styled(Button)`
  min-width: 172px;
  max-width: 205px;
  margin-bottom: 10px;
  box-shadow: rgb(203 203 203) 4px 4px 8px;
`;

const TAKE = 20;

export default withPageAuthRequired(function AdminDashboard() {
    const [search, setSearch] = useState('');
    const [ sortBy, setSortBy ] = useState('createdAt, desc');
    const [ activePage, setActivePage ] = useState(1);
    const [ startDate, setStartDate ] = useState('');
    const [ endDate, setEndDate ] = useState('');
    const [ status, setStatus ] = useState('ALL');
    const [ useStatus, setUseStatus ] = useState('ALL');
    const [ couponName, setCouponName ] = useState('');
    // const [ query, { data, loading }] = useGetAffiliateItemsForAdminDashboardLazyQuery({});
    const [ query, { data, loading }] = useGetAffiliateItemsByAffiliateForAdminDashboardLazyQuery({});

    useEffect(() => {
        query({
            data: {
                take: TAKE,
                skip: (activePage - 1) * TAKE,
                startDate,
                endDate,
                status,
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activePage, status, useStatus]);

    const handleSearchButton = () => {
        if ((startDate !== '' && endDate) ==='' || (startDate === '' && endDate !== '')) {
            alert('Please submit From date and To date');
            return;
        }
    
        query({
            data: {
                take: TAKE,
                skip: (activePage - 1) * TAKE,
                startDate,
                endDate,
                status,
            }
        });
    }

    const handlePageChange = (_: any, { activePage }: any) => {
        setActivePage(activePage);
    };
    
    return (
        <>
            <Head title='GPcoupon | Admin Dashboard' />
            <AppMain>
                <AdminLayout>
                    <Provider>
                        {/* <LabelContainer style={{justifyContent: "space-between"}}>
                            <Heading as="h2" style={{color: "#2D126D"}}>
                                Coupon Dashboard
                            </Heading>
                            <Link href={ROUTES.admin.adminDashboardDetails}>
                                <a>
                                    <DetailBtn rounded>To Detail</DetailBtn>
                                </a>
                            </Link>
                        </LabelContainer>
                        <Spacer size={20} /> */}
                        
                        <Heading as="h2" style={{color: "#2D126D"}}>
                            Coupon Dashboard
                        </Heading>
                        <Spacer size={20} />
                            
                        <section>
                            <LabelContainer>
                                <Input 
                                    label='Coupon Name' 
                                    // label='Merchant Name'        // Should changed to this search name later
                                    icon="search outline"
                                    value={couponName}
                                    onChange={(e) => setCouponName(e.target.value)}
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
                                <Select 
                                    label='Use Status'
                                    value={useStatusOption[0].value}
                                    options={useStatusOption}
                                    onChange={(_, data) => setUseStatus(data.newValues)}
                                    // style={{minWidth: "13em"}}
                                    style={{width: "50%"}}
                                />
                            </LabelContainer>
                            <Spacer size={20} /> */}

                            <DateContainer>
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
                                    {/* <Spacer size={46} /> */}
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
                            </DateContainer>

                        {/* </section> */}
                        </section>
                        <Spacer size={30} />

                        <div style={{border: "2px solid #D9D9D9"}}></div>

                        <div style={{padding: "30px 0"}}>
                            <AdminDashboards 
                                total={data?.total}
                                orders={data?.orders
                                    ?.filter((o: any) => {
                                        if (!couponName) return true;

                                        const similarity = stringSimilarity.compareTwoStrings(
                                            o._id.name,
                                            couponName,
                                        );
                                          
                                        if (similarity > 0.25) return true;
                                          
                                        return false;
                                    })
                                }
                            />
                        </div>
                        <Spacer size={30} />
                        
                        {/* <div style={{padding: "50px 0"}}>
                            <AdminDashboards orders={data} />
                        </div>
                        <Spacer size={20} /> */}

                        <Pagination
                            totalPages={Math.ceil((data?.total?.count || 1) / TAKE)}
                            onPageChange={handlePageChange}
                            activePage={activePage}
                        />
                    </Provider>
                </AdminLayout>
            </AppMain>
        </>
    );
});

function e(e: any) {
    throw new Error('Function not implemented.');
}

