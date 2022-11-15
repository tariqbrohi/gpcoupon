import AdminLayout from '@/layouts/AdminLayout';
import React, { useState } from 'react';
import Router from 'next/router';
import stringSimilarity from 'string-similarity';
import { Input, List, Spacer } from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import { useGetItemsQuery } from '@/services';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from '@/modules/components/Head';
import AppMain from '@/layouts/AppMain';

export default withPageAuthRequired(function Items() {
  const { data: items } = useGetItemsQuery();
  const [search, setSearch] = useState('');

  return (
    <>
      <Head title='GPcoupon | List Request Coupon' />
      <AppMain>
        <AdminLayout>
          <Input
            fluid
            placeholder="Search"
            icon="search outline"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Spacer size={30} />
          <List selection verticalAlign="middle">
            {items
              ?.filter(({ name }) => {
                if (!search) return true;

                const similarity = stringSimilarity.compareTwoStrings(
                  name,
                  search,
                );

                if (similarity > 0.25) return true;

                return false;
              })
              .map((item) => (
                <List.Item
                  key={item.id}
                  onClick={() => Router.push(`${ROUTES.admin.items}/${item.id}`)}
                >
                  <List.Image rounded src={item.imageUrls.small} size="mini" />
                  <List.Content>
                    <List.Heading>{item.name}</List.Heading>
                  </List.Content>
                </List.Item>
              ))}
          </List>
        </AdminLayout>
      </AppMain>
    </>
  );
});
