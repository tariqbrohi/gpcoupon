import React from 'react';
import { ROUTES } from '@/ROUTES';
import { useRouter } from 'next/router';
import { Collapse, List, Sidebar, SidebarProps } from '@growth-ui/react';

export default function AdminSidebar(props: SidebarProps) {
  const { pathname, push } = useRouter();

  const handleClickItem = (route: string) => () => {
    push(route);
  };

  const activeItem = pathname.split('/')[2];

  return (
    <Sidebar visible animation="push" {...props}>
      <List padded verticalAlign="middle" style={{ margin: '0 15px' }}>
        {/* Items */}
        <List.Item active={activeItem === 'items'} style={styles.listItem}>
          <List.Content>Items</List.Content>
        </List.Item>
        <Collapse expanded>
          <List padded selection verticalAlign="middle">
            <List.Item
              active={pathname === ROUTES.admin.createItem}
              onClick={handleClickItem(ROUTES.admin.createItem)}
              style={styles.collapseItem}
            >
              <List.Content>Create Item</List.Content>
            </List.Item>
            <List.Item
              active={pathname === ROUTES.admin.items}
              onClick={handleClickItem(ROUTES.admin.items)}
              style={styles.collapseItem}
            >
              <List.Content>List Items</List.Content>
            </List.Item>
          </List>
        </Collapse>

        {/* Brands */}
        <List.Item active={activeItem === 'brands'} style={styles.listItem}>
          <List.Content>Brands</List.Content>
        </List.Item>
        <Collapse expanded>
          <List padded selection verticalAlign="middle">
            <List.Item
              active={pathname === ROUTES.admin.createBrand}
              onClick={handleClickItem(ROUTES.admin.createBrand)}
              style={styles.collapseItem}
            >
              <List.Content>Create Brand</List.Content>
            </List.Item>
            <List.Item
              active={pathname === ROUTES.admin.listBrands}
              onClick={handleClickItem(ROUTES.admin.listBrands)}
              style={styles.collapseItem}
            >
              <List.Content>List Brands</List.Content>
            </List.Item>
          </List>
        </Collapse>

        {/* GPOINTS */}
        <List.Item active={activeItem === 'gpoints'} style={styles.listItem}>
          <List.Content>GPoints</List.Content>
        </List.Item>
        <Collapse expanded>
          <List padded selection verticalAlign="middle">
            <List.Item
              active={pathname === ROUTES.admin.createGpoint}
              onClick={handleClickItem(ROUTES.admin.createGpoint)}
              style={styles.collapseItem}
            >
              <List.Content>Create Gpoint</List.Content>
            </List.Item>
            <List.Item
              active={pathname === ROUTES.admin.listGpoints}
              onClick={handleClickItem(ROUTES.admin.listGpoints)}
              style={styles.collapseItem}
            >
              <List.Content>List Gpoints</List.Content>
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

        {/* Admin Dashboard */}
        <List.Item active={activeItem === 'admin'} style={styles.listItem}>
          <List.Content>Admin</List.Content>
        </List.Item>
        <Collapse expanded>
          <List padded selection verticalAlign="middle">
            <List.Item
              active={pathname === ROUTES.admin.adminDashboard}
              onClick={handleClickItem(ROUTES.admin.adminDashboard)}
              style={styles.collapseItem}
            >
              <List.Content>Admin Dashboard</List.Content>
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
