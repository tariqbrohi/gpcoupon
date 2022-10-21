import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';
import AppFooter from '@/layouts/AppFooter';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import HowItWorksContent from './howitworks';
import Head from '@/modules/components/Head';
import React from 'react';
import { Spacer } from '@growth-ui/react';

export default function Categories() {
    return (
        <>
            <Head title="GPcoupon | How it works" />
            <AppHeader bgTransition={false} />
            <AppMain style={{backgroundColor: "#f9f9f9"}}>
                <AppContainer>
                    {/* <Search hideOnDesktop /> */}
                    <Spacer size={30} />
                    <HowItWorksContent />
                    <Spacer size={100} />
                </AppContainer>
            </AppMain>
            {/* <AppFooter /> */}
            <AppNav />
        </>
    );
}
