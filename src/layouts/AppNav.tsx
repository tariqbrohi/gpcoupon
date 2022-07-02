import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Grid, IconButton } from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';

const Nav = styled.nav`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid hsla(0, 0%, 85.1%, 0.5);
  background: #fff;
  z-index: 9999;
  padding: 10px 92px;

  ${({ theme }) => theme.gui.media.mobile} {
    display: block;
  }

  ${({ theme }) => theme.gui.media.minimobile} {
    padding: 10px 20px;
  }
`;

export default function AppNav() {
  return (
    <Nav>
      <Grid.Row horizontalAlign="space-between" verticalAlign="middle">
        <Grid.Col>
          <Link href="/">
            <a>
              <IconButton name="home" color="black" size={18} />
            </a>
          </Link>
        </Grid.Col>
        <Grid.Col>
          <Link href={ROUTES.search}>
            <a>
              <IconButton name="search menu" color="black" size={18} />
            </a>
          </Link>
        </Grid.Col>
        <Grid.Col>
          <IconButton name="user" color="black" size={18} />
        </Grid.Col>
      </Grid.Row>
    </Nav>
  );
}
