import React from 'react';
import { ROUTES } from '@/ROUTES';
import { useRouter } from 'next/router';
import { Collapse, Icon, List, Sidebar, SidebarProps, Spacer } from '@growth-ui/react';
import styled from 'styled-components';

const WrapperContainer = styled.div`
  padding: 30px 20px;
  background-color: #F6F6F6;
  height: 100%;
`;

const Wrapper = styled.div`
  min-width: 221.98px;
  min-height: 100vh;
  background-color: #FFF;
  box-shadow: 2px 5px 10px #C0C0C0;
`;

const ListTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ListContent = styled(List.Content)`
  color: #404040;
  font-weight: 600;
`;

export default function AdminSidebar(props: SidebarProps) {
  const { pathname, push } = useRouter();

  const handleClickItem = (route: string) => () => {
    push(route);
  };

  const activeItem = pathname.split('/')[2];

  return (
    <>
      <WrapperContainer>
        <Wrapper>
          <Sidebar visible animation="push" {...props} style={{boxShadow: "0 0 0", width: "240px"}}>
            <List padded verticalAlign="middle" style={{ margin: '0 15px', width: "200px" }}>
              <Spacer size={30} />

              {/* Admin Dashboard */}
              <List.Item 
                // active={pathname === ROUTES.admin.adminDashboard}
                // onClick={handleClickItem(ROUTES.admin.adminDashboard)}
                active={activeItem === 'admin'} 
                style={styles.listItem && {margin: "0"}}
              >
                <ListTitleContainer>
                  <Icon name='newspaper' color='black' />
                  <Spacer size={10} />
                  <ListContent>Dashboard</ListContent>
                </ListTitleContainer>
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
              <Spacer size={30} />

              {/* Coupon */}
              <List.Item active={activeItem === 'items'} style={styles.listItem}>
                <ListTitleContainer>
                  <Icon name='confirmation number' color='black' />
                  <Spacer size={10} />
                  <ListContent>Coupon</ListContent>
                </ListTitleContainer>
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
                <ListTitleContainer>
                  <Icon name='price tag' color='black' />
                  <Spacer size={10} />
                  <ListContent>Brand</ListContent>
                </ListTitleContainer>
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
                    <List.Content>List Brand</List.Content>
                  </List.Item>
                </List>
              </Collapse>
              <Spacer size={30} />
            
              {/* GPOINTS */}
              {/* <List.Item active={activeItem === 'gpoints'} style={styles.listItem}>
                <ListTitleContainer>
                  <Icon name='global' color='black' />
                  <Spacer size={10} />
                  <ListContent>GPoints</ListContent>
                </ListTitleContainer>
              </List.Item>
              
              <Collapse expanded>
                <List padded selection verticalAlign="middle">
                  <List.Item
                    active={pathname === ROUTES.admin.createGpoint}
                    onClick={handleClickItem(ROUTES.admin.createGpoint)}
                    style={styles.collapseItem}
                  >
                    <List.Content>Request GPoints</List.Content>
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
              <Spacer size={30} /> */}
            </List>
          </Sidebar>
        </Wrapper>
      </WrapperContainer>
    </>
  );
}
const styles = {
  listItem: {
    // paddingRight: '160px',
  },
  collapseItem: {
    paddingLeft: '2rem',
  },
};
