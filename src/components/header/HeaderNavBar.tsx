import Link from 'next/link';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { List } from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import AppContext from '@/modules/components/AppContext';

const NavListAnchor = styled.a`
  font-size: 1rem !important;
  color: #404040;
  transition: all 0.7s ease-in-out;

  &:hover {
    color: #f6a2b1;
    text-decoration: underline;
  }
`;

export default function HeaderNavBar() {
  const { country } = useContext(AppContext);

  return (
    <nav>
      {country === 'US' ? (
        <>
          <List horizontal>
            <List.Item>
              <Link href={ROUTES.gpcoupons}>
                <NavListAnchor>Categories</NavListAnchor>
              </Link>
            </List.Item>

            <List.Item>
              <Link href={ROUTES.howItWorks}>
                <NavListAnchor>How it works</NavListAnchor>
              </Link>
            </List.Item>
          </List>
        </>
      ) : (
        <>
          <List horizontal>
            <List.Item>
              <Link href={ROUTES.categories}>
                <NavListAnchor>Categories</NavListAnchor>
              </Link>
            </List.Item>

            <List.Item>
                <Link href={ROUTES.howItWorks}>
                  <NavListAnchor>How it works</NavListAnchor>
                </Link>
              </List.Item>
          </List>
        </>
      )}

        {/* <List.Item>
          <Link href={ROUTES.categories}>
            <a>Categories</a>
          </Link>
        </List.Item>
        <List.Item>
          {country === 'US' && (
            <Link href={ROUTES.gpcoupons}>
              <a>Brands</a>
            </Link>
          )}
        </List.Item> */}

        {/* <List.Item>
          {country === 'US' && (
            <Link href={ROUTES.affiliates}>
              <a>Affiliates</a>
            </Link>
          )}
        </List.Item> */}
    </nav>
  );
}
