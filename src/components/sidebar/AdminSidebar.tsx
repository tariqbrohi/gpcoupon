import React from 'react';
import { ROUTES } from '@/ROUTES';
import { useRouter } from 'next/router';
import { Collapse, Icon, List, Sidebar, SidebarProps, Spacer } from '@growth-ui/react';
import SvgDashboard from '@/icons/dashboard';
import SvgCoupon from '@/icons/coupon';
import SvgBrand from '@/icons/brand';

export default function AdminSidebar(props: SidebarProps) {
  const { pathname, push } = useRouter();

  const handleClickItem = (route: string) => () => {
    push(route);
  };

  const activeItem = pathname.split('/')[2];

  return (
    <Sidebar visible animation="push" {...props}>
      <List padded verticalAlign="middle" style={{ margin: '0 15px' }}>
        {/* Admin Dashboard */}
        <List.Item 
          active={pathname === ROUTES.admin.adminDashboard}
          onClick={handleClickItem(ROUTES.admin.adminDashboard)}
          // active={activeItem === 'admin'} 
          style={styles.listItem}
        >
          <div style={{display: "flex", alignItems: "center", cursor: "pointer"}}>
            {/* <SvgDashboard /> */}
            <Icon name='newspaper' color='black' />
            <Spacer size={10} />
            <List.Content>Admin Dashboard</List.Content>
          </div>
        </List.Item>
        <Spacer size={30} />

        {/* <Collapse expanded>
          <List padded selection verticalAlign="middle">
            <List.Item
              active={pathname === ROUTES.admin.adminDashboard}
              onClick={handleClickItem(ROUTES.admin.adminDashboard)}
              style={styles.collapseItem}
            >
              <List.Content>Admin Dashboard</List.Content>
            </List.Item>
          </List>
        </Collapse> */}

        {/* Coupon */}
        <List.Item active={activeItem === 'items'} style={styles.listItem}>
          <div style={{display: "flex", alignItems: "center"}}>
            {/* <SvgCoupon /> */}
            <Icon name='confirmation number' color='black' />
            <Spacer size={10} />
            <List.Content>Coupon</List.Content>
          </div>
        </List.Item>
        <Collapse expanded>
          <List padded selection verticalAlign="middle">
            <List.Item
              active={pathname === ROUTES.admin.createItem}
              onClick={handleClickItem(ROUTES.admin.createItem)}
              style={styles.collapseItem}
            >
              <List.Content>Request Coupon</List.Content>
            </List.Item>
            <List.Item
              active={pathname === ROUTES.admin.items}
              onClick={handleClickItem(ROUTES.admin.items)}
              style={styles.collapseItem}
            >
              <List.Content>List Coupon</List.Content>
            </List.Item>
          </List>
        </Collapse>
        <Spacer size={30} />

        {/* Brand */}
        <List.Item active={activeItem === 'brands'} style={styles.listItem}>
          <div style={{display: "flex", alignItems: "center"}}>
            {/* <SvgBrand /> */}
            <Icon name='price tag' color='black' />
            <Spacer size={10} />
            <List.Content>Brand</List.Content>
          </div>
        </List.Item>
        <Collapse expanded>
          <List padded selection verticalAlign="middle">
            <List.Item
              active={pathname === ROUTES.admin.createBrand}
              onClick={handleClickItem(ROUTES.admin.createBrand)}
              style={styles.collapseItem}
            >
              <List.Content>Request Brand</List.Content>
            </List.Item>
            <List.Item
              active={pathname === ROUTES.admin.listBrands}
              onClick={handleClickItem(ROUTES.admin.listBrands)}
              style={styles.collapseItem}
            >
              <List.Content>List Brand</List.Content>
            </List.Item>
          </List>
        </Collapse>
        <Spacer size={30} />

        {/* GPOINTS */}
        <List.Item active={activeItem === 'gpoints'} style={styles.listItem}>
          <div style={{display: "flex", alignItems: "center"}}>
            <Icon name='global' color='black' />
            <Spacer size={10} />
            <List.Content>GPoints</List.Content>
          </div>
        </List.Item>
        <Collapse expanded>
          <List padded selection verticalAlign="middle">
            <List.Item
              active={pathname === ROUTES.admin.createGpoint}
              onClick={handleClickItem(ROUTES.admin.createGpoint)}
              style={styles.collapseItem}
            >
              <List.Content>Request GPoint</List.Content>
            </List.Item>
            <List.Item
              active={pathname === ROUTES.admin.listGpoints}
              onClick={handleClickItem(ROUTES.admin.listGpoints)}
              style={styles.collapseItem}
            >
              <List.Content>List GPoints</List.Content>
            </List.Item>

            <List.Item
              active={pathname === ROUTES.admin.orders}
              onClick={handleClickItem(ROUTES.admin.orders)}
              style={styles.collapseItem}
            >
              <List.Content>Orders</List.Content>
            </List.Item>
          </List>
        </Collapse>
      </List>
    </Sidebar>
  );
}
const styles = {
  listItem: {
    paddingRight: '160px',
  },
  collapseItem: {
    paddingLeft: '2rem',
  },
};
