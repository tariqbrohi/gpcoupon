import AddCard from '@/components/payment-cards/AddCard';
import AppContainer from '@/layouts/AppContainer';
import AppFooter from '@/layouts/AppFooter';
import AppHeader from '@/layouts/AppHeader';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import CardList from '@/components/payment-cards/CardList';
import CategoryList from '@/components/categories/CategoryList';
import Head from '@/modules/components/Head';
import PaymentMethodForm from '@/modules/components/PaymentMethodForm';
import React from 'react';
import Search from '@/modules/components/Search';
import { Button, Paragraph, Spacer } from '@growth-ui/react';

export default function PaymentCards() {
  return (
    <>
      <Head />
      <AppHeader bgTransition={false} />
      <AppMain>
        <AppContainer>
          <Paragraph fontSize={22} fontWeight={600}>
            Payment Methods
          </Paragraph>
          <Spacer size={20} />
          <AddCard trigger={<Button rounded>Add new card</Button>} />
          <Spacer size={40} />
          <CardList />
        </AppContainer>
      </AppMain>
      {/* <AppFooter /> */}
      <AppNav />
    </>
  );
}
