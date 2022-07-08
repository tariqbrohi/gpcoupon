import HeaderLanguageSelector from '@/components/header/HeaderLanguageSelector';
import HeaderNavBar from '@/components/header/HeaderNavBar';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Search from '@/modules/components/Search';
import styled from 'styled-components';
import { Button, Grid, Spacer, StyledGridRow } from '@growth-ui/react';
import { color } from '@/modules/brandingTheme';
import { FaUserCircle } from 'react-icons/fa';
import { ROUTES } from '@/ROUTES';
import { useRouter } from 'next/router';
import { useStyles } from '../styles/components/navbarStyles';
import {
  Typography,
  Input,
  InputAdornment,
  Divider,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';

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

export default function AppHeader({
  hideOnMobile = true,
  bgTransition = false,
}: Props) {
  const ref = useRef<HTMLHeadElement>(null);

  const [isUser, setisUser] = useState(false);
  const [userName, setUserName] = useState(``);
  const classes = useStyles();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (typeof window === `object`) {
      const userId: any = localStorage.getItem(`userId`);

      if (userId && userId?.length !== 2) {
        setisUser(true);
      }

      const username: any = localStorage.getItem(`userName`);

      if (username !== ``) {
        setUserName(username);
      }
    }

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
                  src="/images/gpoint-black-logo.png"
                  style={{ width: '85px' }}
                />
              </a>
            </Link>
            <Spacer size={20} />
            <HeaderNavBar />
            <Spacer size={20} />
          </Grid.Row>
        </Grid.Col>
        <Grid.Col flex="1">
          <Search />
        </Grid.Col>
        <Grid.Col>
          <Grid.Row verticalAlign="middle">
            <Spacer size={20} />
            {isUser ? (
              <>
                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <FaUserCircle />
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  className={classes.menubar}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: `visible`,
                      filter: `drop-shadow(0px 2px 8px rgba(0,0,0,0.32))`,
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: `""`,
                        display: `block`,
                        position: `absolute`,
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: `background.paper`,
                        transform: `translateY(-50%) rotate(45deg)`,
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: `right`, vertical: `top` }}
                  anchorOrigin={{ horizontal: `right`, vertical: `bottom` }}
                >
                  <MenuItem>
                    <Avatar sx={{ width: 28, height: 28 }} /> {userName}
                  </MenuItem>
                  <MenuItem onClick={() => router.push(`/my-gift`)}>
                    My gifts
                  </MenuItem>
                  <Divider />

                  <MenuItem
                    onClick={() => {
                      localStorage.clear();
                      router.push(`/`);
                      router.reload();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Link href={ROUTES.login}>
                  <a>Login</a>
                </Link>
                <Spacer size={20} />
                <Button onClick={() => window.open('https://gpointwallet.com')}>
                  Signup
                </Button>
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
