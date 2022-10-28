import AdminLayout from '@/layouts/AdminLayout';
import Provider from '@/components/admin/items/Provider';
import React, { useContext, useEffect, useState } from 'react';
import { Heading, Pagination, Spacer } from '@growth-ui/react';
import { useGetAffiliateItemsForDashboardLazyQuery } from '@/services';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import AdminDashboards from './dashboard';
import AppContext from '@/modules/components/AppContext';

const TAKE = 20;

export default withPageAuthRequired(function AdminDashboard() {
    const { user } = useContext(AppContext);
    const [ sortBy, setSortBy ] = useState('createdAt,desc');
    const [ activePage, setActivePage ] = useState(1)
    const [ query, { data, loading }] = useGetAffiliateItemsForDashboardLazyQuery({});

    useEffect(() => {
        query({
            data: {
                take: TAKE,
                sub: user?.id,
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
            <AdminLayout>
                <Provider>
                    <Heading as="h2">
                        Admin Dashboard
                    </Heading>
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
        </>
    );
});
