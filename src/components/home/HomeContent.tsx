import Link from 'next/link';
import React from 'react';
import Search from '@/modules/components/Search';
import Spacer from '../Spacer';
import styled from 'styled-components';
import { Chip, Grid } from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';

const Container = styled.div`
  position: sticky;
  top: 50px;
  display: none;
  background: #fff;
  padding: 30px 0px;
  z-index: 9999;

  ${({ theme }) => theme.gui.media.mobile} {
    display: block;
  }
`;

export default function HomeContent() {
  return (
    <Container>
      <Search />
      <Spacer size={15} />
      <Grid.Row>
        <Link href={ROUTES.categories}>
          <a>
            <Chip text="Categories" />
          </a>
        </Link>
        {/* <Spacer size={10} />
        <Link href={ROUTES.affiliates}>
          <a>
            <Chip text="Affiliates" />
          </a>
        </Link> */}
      </Grid.Row>
    </Container>
  );
}
