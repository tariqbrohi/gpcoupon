import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import Grid from '@/modules/components/Grid';
import Head from '@/modules/components/Head';
import PaymentInfo from '@/components/confirm-and-payment/PaymentInfo';
import Recipient from '@/components/confirm-and-payment/Recipient';

export default function ConfirmAndPay() {
  return (
    <>
      <Head />
      <AppHeader bgTransition={false} />
      <AppMain>
        <AppContainer>
          <Grid repeat={2} mobile={1}>
            <Recipient />
            <PaymentInfo />
          </Grid>
        </AppContainer>
      </AppMain>
      <AppNav />
    </>
  );
}
