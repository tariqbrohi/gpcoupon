import AdminLayout from '@/layouts/AdminLayout';
import Provider from '@/components/admin/items/Provider';
import React from 'react';
import { Heading, Spacer } from '@growth-ui/react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(function AdminDashboard() {
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
