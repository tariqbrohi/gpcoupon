/* eslint-disable @next/next/no-img-element */
import AffiliateDashboardSidebar from '@/components/sidebar/AffiliateDashboardSidebar';
import React, { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import { Grid, Sidebar, StyledGridRow } from '@growth-ui/react';
import styled from 'styled-components';
import { color } from '@/modules/brandingTheme';
import Link from 'next/link';
import AppContainer from './AppContainer';

interface Props {
  /** Hide on mobile devices. */
  hideOnMobile?: boolean;

  /** Enable background color transition on scroll. */
  bgTransition?: boolean;
}

const Container = styled(StyledGridRow)`
  padding: 16px 32px;
`;

const Header = styled('header')<Props>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 10000;
  transition: background 200ms ease-in-out;

  & > ${StyledGridRow}:last-child {
    max-width: ${({ theme }) => theme.size.headerMaxWidth + 100}px;
    margin: 0 auto;
  }

  a {
    font-weight: 600;
    font-size: 13px;
  }

  ${({ theme }) => theme.gui.media.mobile} {
    ${({ hideOnMobile }) => hideOnMobile && 'display: none;'}
    padding: 20px 0;
    background: ${({ theme }) => theme.color['themeBg-600']};

    & > ${StyledGridRow}:last-child {
      display: none;
    }
  }
`;

const AppContainerAffiliateDashboard = styled(AppContainer)`
  max-width: ${({ theme }) => theme.size.maxWidth + 100}px;
  padding: 30px 32px 0px;
`;

export default function AffiliateDashboardLayout(prop: Prop, { hideOnMobile = true, bgTransition = false, }: Props) {
  const ref = useRef<HTMLHeadElement>(null);

  useEffect(() => {
    if (bgTransition) {
      const elem = ref.current!;

      function handleScroll() {
        if (window.innerWidth < 768 && window.scrollY > 80) {
          elem.style.background = '#fff';
        } else if (window.innerWidth < 768 && window.scrollY <= 80) {
          elem.style.background = color['themeBg-600'];
        } else if (window.innerWidth >= 768 && window.scrollY > 80) {
          elem.style.background = color['themeBg-600'];
        } else if (window.innerWidth >= 768 && window.scrollY <= 80) {
          elem.style.background = '#fff';
        }
      }

      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [bgTransition]);

  return (
    <>
      {/* <Header ref={ref} hideOnMobile={hideOnMobile}>
        <Container verticalAlign="middle">
          <Grid.Col>
            <Grid.Row verticalAlign="middle">
              <Link href="/">
                <a>
                  <img
                    src="/images/logo_with_rich.png"
                    alt='GPoint Coupon with Rich'
                    style={{ width: '140px' }}
                  />
                </a>
              </Link>
            </Grid.Row>
          </Grid.Col>
        </Container>
      </Header> */}

      <AppContainerAffiliateDashboard>
        <Sidebar.Pushable style={styles.pushable}>
          <AffiliateDashboardSidebar />
          <Sidebar.Pusher style={styles.pusher}>
            {prop.children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </AppContainerAffiliateDashboard>
    </>
  );
}

const styles: Record<string, CSSProperties> = {
  pushable: {
    minHeight: '100vh',
    height: '100%',
  },
  pusher: {
    // padding: '80px 26px',
    padding: '0 26px 30px',
    maxHeight: "none",
    minHeight: "100vh",
  },
};

type Prop = {
  children: ReactNode;
};
