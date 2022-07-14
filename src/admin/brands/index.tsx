import AdminLayout from '@/layouts/AdminLayout';
import React, { useState } from 'react';
import Router from 'next/router';
import stringSimilarity from 'string-similarity';
import { Input, List, Spacer } from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import { useGetBrandsQuery } from '@/services';

export default function Brands() {
  const { data: brands } = useGetBrandsQuery();
  const [search, setSearch] = useState('');

  return (
    <>
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
          {brands
            ?.filter(({ name }) => {
              if (!search) return true;

              const similarity = stringSimilarity.compareTwoStrings(
                name,
                search,
              );

              if (similarity > 0.25) return true;

              return false;
            })
            .map((brand) => (
              <List.Item
                key={brand.id}
                onClick={() =>
                  Router.push(`${ROUTES.admin.brands}/${brand.slug}`)
                }
              >
                <List.Image rounded src={brand.thumbnailUrl} size="mini" />
                <List.Content>
                  <List.Heading>{brand.name}</List.Heading>
                </List.Content>
              </List.Item>
            ))}
        </List>
      </AdminLayout>
    </>
  );
}
