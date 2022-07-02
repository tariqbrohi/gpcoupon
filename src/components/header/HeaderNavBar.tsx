import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { List } from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';

const Nav = styled('nav')``;

export default function HeaderNavBar() {
  return (
    <Nav>
      <List horizontal>
        {/* <List.Item>
          <Link href={ROUTES.affiliates}>
            <a>Affiliates</a>
          </Link>
        </List.Item> */}
        <List.Item>
          <Link href={ROUTES.categories}>
            <a>Categories</a>
          </Link>
        </List.Item>
      </List>
    </Nav>
  );
}
