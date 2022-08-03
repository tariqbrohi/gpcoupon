import Link from 'next/link';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { List } from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import AppContext from '@/modules/components/AppContext';

const Nav = styled('nav')``;

export default function HeaderNavBar() {
  const { country } = useContext(AppContext);

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
        <List.Item>
          {country === 'US' && (
            <Link href={ROUTES.brands}>
              <a>Brands</a>
            </Link>
          )}
        </List.Item>
      </List>
    </Nav>
  );
}
