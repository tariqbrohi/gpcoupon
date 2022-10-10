import Avatar from '@/modules/components/Avatar';
import HeaderLanguageSelector from '@/components/header/HeaderLanguageSelector';
import HeaderNavBar from '@/components/header/HeaderNavBar';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useUser from '@/auth/useUser';
import { Button, Grid, Spacer, StyledGridRow } from '@growth-ui/react';
import { color } from '@/modules/brandingTheme';

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
    max-width: ${({ theme }) => theme.size.headerMaxWidth}px;
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

const LoginButton = styled.a`
  font-size: 1rem !important;
  transition: all 0.4s ease-in-out;

  &:hover {
    color: #F6A2b1;
  }
`;

const SignUpButton = styled(Button)`
  background-color: #F6A2B1;
  color: #fff;
  border-radius: 25px;
  box-shadow: rgb(203 203 203) 4px 4px 8px;
  transition: all 0.7s ease-in-out;

  &:hover {
    background-color: #2D126D;
  }
`;

export default function AppHeader({
  hideOnMobile = true,
  bgTransition = false,
}: Props) {
  const ref = useRef<HTMLHeadElement>(null);
  const { user } = useUser();

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
    <Header ref={ref} hideOnMobile={hideOnMobile}>
      <HeaderLanguageSelector />
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
            <Spacer size={20} />
            <HeaderNavBar />
            <Spacer size={20} />
          </Grid.Row>
        </Grid.Col>
        <Grid.Col flex="1">{/* <Search /> */}</Grid.Col>
        <Grid.Col>
          <Grid.Row verticalAlign="middle">
            <Spacer size={20} />
            {user && <Avatar />}
            {!user && (
              <>
                <Link href="/login">
                  <LoginButton>Login</LoginButton>
                </Link>
                <Spacer size={20} />
                <SignUpButton
                  onClick={() => {
                    window.open('https://gpointwallet.com/account/signup');
                  }}
                >
                  Signup
                </SignUpButton>
              </>
            )}
          </Grid.Row>
        </Grid.Col>
      </Container>
    </Header>
  );
}

interface Props {
  /** Hide on mobile devices. */
  hideOnMobile?: boolean;

  /** Enable background color transition on scroll. */
  bgTransition?: boolean;
}
