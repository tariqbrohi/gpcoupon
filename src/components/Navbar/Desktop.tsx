import Image from 'next/image';
import Logo from '@/asset/logo.png';
import React, { useEffect, useState } from 'react';
import { useStyles } from '../../styles/components/navbarStyles';
import TopBarDialog from '../../components/Modal/TopBarDialog';
import {
  Typography,
  Input,
  InputAdornment,
  Button,
  Divider,
  ListItemIcon,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';

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
      console.log(`userId`, userId);
      if (userId.length !== 2) {
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
        <Image
          alt={`image`}
          src={Logo}
          width="155px"
          height={`35px`}
          onClick={() => router.push(`/`)}
          style={{ cursor: `pointer` }}
        />

        <Typography
          className={classes.headText}
          variant="subtitle2"
          component="div"
          onClick={() => router.push(`/brands`)}
        >
          Brands
        </Typography>
        <Typography
          className={classes.headText}
          variant="subtitle2"
          component="div"
          onClick={() => router.push(`/categories`)}
        >
          Categories
        </Typography>
        <Input
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
        />
        <Typography
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
        </Typography>

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
              <MenuItem>Coupons</MenuItem>

              <MenuItem>Invite Friends</MenuItem>
              <Divider />

              <MenuItem
                onClick={() => {
                  typeof window === `object` && localStorage.clear();
                  router.push(`/login`);
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Typography
              className={classes.headText}
              variant="subtitle2"
              onClick={() => router.push(`/login`)}
              component="div"
            >
              Login
            </Typography>
            <Button className={classes.buttonContained} variant="contained">
              Sign up
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default Desktop;
