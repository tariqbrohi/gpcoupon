import AdminLayout from '@/layouts/AdminLayout';
import Provider from '@/components/admin/items/Provider';
import React, { useState } from 'react';
import Router from 'next/router';
import stringSimilarity from 'string-similarity';
import { Input, List, Heading, Spacer } from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import { useGetItemsQuery } from '@/services';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(function AdminDashboards() {
    const { data: items } = useGetItemsQuery();
    const [search, setSearch] = useState('');
    
    return (
        <>
            <AdminLayout>
                <Provider>
                    <Heading as="h2">
                        Admin Dashboard
                    </Heading>
                    {/* <CreateItemForm /> */}
                    <Spacer size={20} />

                </Provider>
            </AdminLayout>
        </>
    );
});
