import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import HowItWorksContent from './howitworks';
import Head from '@/modules/components/Head';
import React from 'react';
import { Spacer } from '@growth-ui/react';
import styled from 'styled-components';

const AppMainCustom = styled(AppMain)`
    background-color: #f9f9f9;
    margin-bottom: 0;
    border-bottom: 2px #fff solid;
`;

export default function HowItWorks() {
    return (
        <>
            <Head title="GPcoupon | How it works" />
            <AppHeader bgTransition={false} />
            <AppMainCustom>
                <AppContainer>
                    <Spacer size={30} />

                    <HowItWorksContent />
                    <Spacer size={100} />
                </AppContainer>
            </AppMainCustom>

            <AppNav />
        </>
    );
}
