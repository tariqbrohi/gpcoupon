import Link from 'next/link';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { List } from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import AppContext from '@/modules/components/AppContext';

const Nav = styled('nav')``;

const NavListAnchor = styled.a`
  font-size: 1rem !important;
  color: #404040;
  transition: all 0.7s ease-in-out;

  &:hover {
    color: #F6A2b1;
    text-decoration: underline;
  }
`;

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

        <List.Item style={{padding: "0"}}>
          <Link href={ROUTES.gcoupons}>
            <NavListAnchor>Categories</NavListAnchor>
          </Link>
        </List.Item>

        {/* <List.Item>
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
        <List.Item>
          {country === 'US' && (
            <Link href={ROUTES.affiliates}>
              <a>Affiliates</a>
            </Link>
          )}
        </List.Item> */}
      </List>
    </Nav>
  );
}
