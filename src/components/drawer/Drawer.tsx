import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MUIDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Router from 'next/router';
import { ROUTES } from '@/ROUTES';

const drawerWidth = 240;

const DrawerHeader = styled(`div`)(({ theme }) => ({
  display: `flex`,
  alignItems: `center`,
  padding: theme.spacing(0, 1),
  justifyContent: `flex-end`,
  ...(theme.mixins.toolbar as any),
}));

export default function Drawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const theme = useTheme();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRoute = (route: string) => () => Router.push(route);

  return (
    <MUIDrawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: `border-box`,
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === `ltr` ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleRoute(ROUTES.admin.createBrand)}>
            <ListItemText primary={'Create Brand'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleRoute(ROUTES.admin.createCoupon)}>
            <ListItemText primary={'Create Coupon'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleRoute(ROUTES.admin.orders)}>
            <ListItemText primary={'Orders'} />
          </ListItemButton>
        </ListItem>
      </List>
    </MUIDrawer>
  );
}
