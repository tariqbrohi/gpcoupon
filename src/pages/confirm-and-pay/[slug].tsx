import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import Grid from '@/modules/components/Grid';
import Head from '@/modules/components/Head';
import PaymentInfo from '@/components/confirm-and-payment/PaymentInfo';
import Provider from '@/components/confirm-and-payment/Provider';
import Recipient from '@/components/confirm-and-payment/Recipient';
import { Spacer } from '@growth-ui/react';

export default function ConfirmAndPay() {
  return (
    <>
      <Head />
      <AppHeader bgTransition={false} />
      <AppMain>
        <AppContainer>
          <Grid repeat={2} mobile={1}>
            <Provider>
              <Recipient />
              <PaymentInfo />
            </Provider>
          </Grid>
          <Spacer size={100} />
        </AppContainer>
      </AppMain>
      <AppNav />
    </>
  );
}
