import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useStyles } from '../../styles/components/navbarStyles';
import TopBarDialog from '../../components/Modal/TopBarDialog';
import {
  Typography,
  Input,
  InputAdornment,
  Button,
  Divider,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import { FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Spacer from '../Spacer';

const Desktop = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [isUser, setisUser] = useState(false);
  const [userName, setUserName] = useState(``);

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
  }, []);

  // console.log('isUser', isUser)

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  const router = useRouter();
  return (
    <>
      <div className={classes.topBar}>
        <TopBarDialog />
      </div>
      <div className={classes.navMain}>
        <Box
          sx={{
            width: '80%',
            display: 'flex',
            margin: '0 auto',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <img
            src="/asset/GPoint_Black_logo.png"
            width="103px"
            onClick={() => router.push(`/`)}
            style={{ cursor: `pointer` }}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Typography
              className={classes.headText}
              variant="subtitle2"
              component="div"
              onClick={() => router.push(`/affiliates`)}
            >
              Affiliates
            </Typography>
            <Spacer size={15} />
            <Typography
              className={classes.headText}
              variant="subtitle2"
              component="div"
              onClick={() => router.push(`/categories`)}
            >
              Categories
            </Typography>
            {/* <Input
              className={classes.root}
              disabled
              onClick={() => {
                console.log(`hello`);
                router.push(`/searching`);
              }}
              placeholder="Search gifts or brands"
              startAdornment={
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              }
            /> */}
            {/* <Typography
          className={classes.headText}
          variant="subtitle2"
          component="div"
          onClick={() => router.push(`/help`)}
        >
          Help
        </Typography>
        <Typography
          className={classes.headText}
          variant="subtitle2"
          component="div"
          onClick={() => router.push(`/howtouse`)}
        >
          How to Use
        </Typography> */}

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
                <Spacer size={10} />
                <Typography
                  className={classes.headText}
                  variant="subtitle2"
                  onClick={() => router.push(`/login`)}
                  component="div"
                >
                  Login
                </Typography>
                <Spacer size={10} />
                <Button
                  className={classes.buttonContained}
                  variant="contained"
                  onClick={() =>
                    window.open('https://gpointwallet.com/account/create')
                  }
                >
                  Sign up
                </Button>
              </>
            )}
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Desktop;
