import Link from 'next/link';
import React, { useContext } from 'react';
import Search from '@/modules/components/Search';
import styled from 'styled-components';
import { Chip, Grid, Spacer } from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import AppContext from '@/modules/components/AppContext';

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
  const { country } = useContext(AppContext);

  return (
    <Container>
      {/* <Search /> */}
      <Spacer size={15} />

      <Grid.Row>
        {country === 'US' ? (
          <>
            <Link href={ROUTES.gpcoupons}>
              <a>
                <Chip text="Categories" />
              </a>
            </Link>
            <Spacer size={10} />
          </>
        ) : (
          <>
            <Link href={ROUTES.categories}>
              <a>
                <Chip text="Categories" />
              </a>
            </Link>
            <Spacer size={10} />
          </>
        )}
      </Grid.Row>
    </Container>
  );
}
