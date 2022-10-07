import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon, List, Skeleton } from '@growth-ui/react';
import { useGetCategoriesQuery } from '@/services';
import { ROUTES } from '@/ROUTES';
import Router from 'next/router';

const Wrapper = styled.div`
  font-weight: 600;
  margin-right: 40px;
  min-width: 221.98px;

  & li {
    margin-bottom: 20px;
  }
`;

export default function SideBar({
  cat: _cat,
  setCat,
  loading,
}: any) {
  const { data } = useGetCategoriesQuery();
  return (
    <Wrapper>
      <List selection padded>
        {/* <List.Item 
          // active={!_cat} onClick={() => setCat()}
          onClick={() => Router.push('/')}
        >
          <List.Content>Home</List.Content>
        </List.Item> */}
        <List.Item>
          <List.Content>My Coupons</List.Content>
        </List.Item>
      </List>
    </Wrapper>
  );
}
