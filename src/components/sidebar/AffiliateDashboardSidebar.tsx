import React from 'react';
import { ROUTES } from '@/ROUTES';
import { useRouter } from 'next/router';
import { Collapse, Icon, List, Sidebar, SidebarProps, Spacer } from '@growth-ui/react';
import styled from 'styled-components';

const WrapperContainer = styled.div`
  padding: 30px 20px;
  background-color: #F6F6F6;
`;

const Wrapper = styled.div`
  min-width: 221.98px;
  height: 100vh;
  background-color: #FFF;
  box-shadow: 2px 5px 10px #C0C0C0;
`;

const ListContent = styled(List.Content)`
  color: #404040;
  font-weight: 600;
`;

export default function AffiliateDashboardSidebar(props: SidebarProps) {
  const { pathname, push } = useRouter();

  const handleClickItem = (route: string) => () => {
    console.log('click', route); //remove later
    push(route);
  };

  const activeItem = pathname.split('/')[2];
  const activeSubItem = pathname.split('/')[3];

  return (
    <>
      <WrapperContainer>
        <Wrapper>
          <Sidebar visible animation="push" {...props} style={{boxShadow: "0 0 0", width: "240px"}}>
            <List padded verticalAlign="middle" style={{ margin: '0 15px', width: "200px" }}>
              <Spacer size={30} />

              {/* Affiliate Dashboard */}
              <List.Item 
                active={activeItem === 'affiliateDashboard'} 
                style={styles.listItem && {margin: "0"}}
              >
                <div style={{display: "flex", alignItems: "center"}}>
                  <Icon name='newspaper' color='black' />
                  <Spacer size={10} />
                  <ListContent>Dashboard</ListContent>
                </div>
              </List.Item>
              <Collapse expanded>
                <List padded selection verticalAlign="middle">
                  <List.Item
                    active={pathname === ROUTES.affiliateDashboard}
                    onClick={handleClickItem(ROUTES.affiliateDashboard)}
                    style={styles.collapseItem}
                  >
                    <List.Content>My Coupons</List.Content>
                  </List.Item>
                </List>
              </Collapse>
              <Spacer size={30} />

              {/* Coupon Reaquests*/}
              <List.Item active={activeItem === 'coupons'} style={styles.listItem}>
                <div style={{display: "flex", alignItems: "center"}}>
                  <Icon name='confirmation number' color='black' />
                  <Spacer size={10} />
                  <ListContent>Coupon Requests</ListContent>
                </div>
              </List.Item>
              <Collapse expanded>
                <List padded selection verticalAlign="middle">
                  <List.Item
                    // active={pathname === ROUTES.affiliateDashboard.couponRequestList}
                    // onClick={handleClickItem(ROUTES.affiliateDashboard.couponRequestList)}
                    style={styles.collapseItem}
                  >
                    <List.Content>My Coupon Requests</List.Content>
                  </List.Item>
                  <List.Item
                    // active={pathname === ROUTES.affiliateDashboard.couponRequest}
                    // onClick={handleClickItem(ROUTES.affiliateDashboard.couponRequest)}
                    style={styles.collapseItem}
                  >
                    <List.Content>Request Coupon</List.Content>
                  </List.Item>
                </List>
              </Collapse>
              <Spacer size={30} />
            
              {/* Brand */}
              <List.Item active={activeItem === 'brands'} style={styles.listItem}>
                <div style={{display: "flex", alignItems: "center"}}>
                  <Icon name='price tag' color='black' />
                  <Spacer size={10} />
                  <ListContent>Brand</ListContent>
                </div>
              </List.Item>
              <Collapse expanded>
                <List padded selection verticalAlign="middle">
                  <List.Item
                    active={pathname === ROUTES.affiliateBrands}
                    onClick={handleClickItem(ROUTES.affiliateBrands)}
                    style={styles.collapseItem}
                  >
                    <List.Content>My Brand</List.Content>
                  </List.Item>
                  <List.Item
                    active={pathname === ROUTES.affiliateCreateBrands}
                    onClick={handleClickItem(ROUTES.affiliateCreateBrands)}
                    style={styles.collapseItem}
                  >
                    <List.Content>Create Brand</List.Content>
                  </List.Item>
                </List>
              </Collapse>
              <Spacer size={30} />
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
