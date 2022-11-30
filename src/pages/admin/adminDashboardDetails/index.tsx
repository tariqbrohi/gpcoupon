import Provider from "@/components/admin/items/Provider";
import AdminLayout from "@/layouts/AdminLayout";
import AppMain from "@/layouts/AppMain";
import Head from "@/modules/components/Head";
import { useGetAffiliateItemsForAdminDashboardLazyQuery, useGetItemForCouponDetailDashboardLazyQuery } from "@/services";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Button, Heading, Pagination, Select, Spacer } from "@growth-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import DashboardDetails from "./dashboardDetails";

const LabelContainer = styled.div`
    display: flex;
    align-items: center;
`;

const BackBtn = styled(Button)`
    min-width: 172px;
    max-width: 205px;
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 10px;
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

const TAKE = 20;

export default withPageAuthRequired(function Details() {
    const [ sortBy, setSortBy ] = useState('createdAt, desc');
    const [ activePage, setActivePage ] = useState(1);
    const [ status, setStatus ] = useState('all');
    const router = useRouter();
    // const [ query, { data, loading }] = useGetAffiliateItemsForAdminDashboardLazyQuery({});
    const [ query, { data, loading }] = useGetItemForCouponDetailDashboardLazyQuery({});
    const { startDate, endDate, slug } = router.query;

    const statusOption = [
        {
            key: "all",
            value: "all",
            text: "All",
        },
        {
            key: "available",
            value: "available",
            text: "Unused",
        },
        {
            key: "used",
            value: "used",
            text: "Used",
        },
        {
            key: "expired",
            value: "expired",
            text: "Expired",
        },
    ];

    useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activePage, status]);

    const handlePageChange = (_: any, { activePage }: any) => {
        setActivePage(activePage);
    };

    return (
        <>
            <Head title='GPcoupon | Admin Dashboard Details' />
            <AppMain>
                <AdminLayout>
                    <Provider>
                        <LabelContainer style={{justifyContent: "space-between"}}>
                            <Heading as="h2" style={{color: "#2D126D"}}>
                                Coupon Details
                            </Heading>
                            <BackBtn onClick={() => router.back()}>
                                Back
                            </BackBtn>
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
                        <Spacer size={30} />

                        <div style={{border: "2px solid #D9D9D9"}}></div>

                        <div style={{padding: "50px 0"}}>
                            {/* <DashboardDetails orders={data} /> */}
                            <DashboardDetails result={data} status={status} />
                        </div>
                        <Spacer size={20} />

                        <Pagination
                            totalPages={Math.ceil((data?.totalCount || 1) / TAKE)}
                            onPageChange={handlePageChange}
                            activePage={activePage}
                        />
                    </Provider>
                </AdminLayout>
            </AppMain>
        </>
    );
})