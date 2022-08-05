import AppContainer from '@/layouts/AppContainer';
import AppContext from '@/modules/components/AppContext';
import AppHeader from '@/layouts/AppHeader';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import Head from '@/modules/components/Head';
import OrderHistory from '@/components/orders/OrderHistory';
import { Paragraph, Spacer } from '@growth-ui/react';
import { useContext } from 'react';

export default function Orders() {
  const { country } = useContext(AppContext);

  return (
    <>
      <Head title="Order History" />
      <AppHeader bgTransition hideOnMobile={false} />
      <AppMain>
        <AppContainer>
          <Paragraph fontWeight={600} fontSize={24}>
            My gifts
          </Paragraph>
          <Spacer size={30} />
          <OrderHistory />
        </AppContainer>
      </AppMain>
      <AppNav />
    </>
  );
}
