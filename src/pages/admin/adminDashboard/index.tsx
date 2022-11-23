import Head from '@/modules/components/Head';
import AdminLayout from '@/layouts/AdminLayout';
import Provider from '@/components/admin/items/Provider';
import React, { useEffect, useState } from 'react';
import { Button, Heading, Pagination, Spacer } from '@growth-ui/react';
import { useGetAffiliateItemsForAdminDashboardLazyQuery } from '@/services';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import AdminDashboards from './dashboards';
import AppMain from '@/layouts/AppMain';
import Link from 'next/link';
import { ROUTES } from '@/ROUTES';

const TAKE = 20;

export default withPageAuthRequired(function AdminDashboard() {
    const [ sortBy, setSortBy ] = useState('createdAt, desc');
    const [ activePage, setActivePage ] = useState(1);
    const [ query, { data, loading }] = useGetAffiliateItemsForAdminDashboardLazyQuery({});

    useEffect(() => {
        query({
            data: {
                take: TAKE,
                sortBy,
                skip: (activePage - 1) * TAKE,
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activePage, sortBy]);

    const handlePageChange = (_: any, { activePage }: any) => {
        setActivePage(activePage);
    };
    
    return (
        <>
            <Head title='GPcoupon | Admin Dashboard' />
            <AppMain>
                <AdminLayout>
                    <Provider>
                        <Heading as="h2">
                            Coupon Dashboard
                        </Heading>
                        <Link href={ROUTES.admin.adminDashboardDetails}>
                            <a>
                                <Button>Detail 임시버튼</Button>
                            </a>
                        </Link>
                        <div style={{padding: "50px 0"}}>
                            <AdminDashboards orders={data} />
                        </div>
                        <Spacer size={20} />

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
