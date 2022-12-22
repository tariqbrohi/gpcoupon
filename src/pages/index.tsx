import AppContainer from '@/layouts/AppContainer';
import AppContext from '@/modules/components/AppContext';
import AppHeader from '@/layouts/AppHeader';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import Categories from '@/components/home/Categories';
import Head from '@/modules/components/Head';
import Hero from '@/components/home/Hero';
import HomeContent from '@/components/home/HomeContent';
import HowToUse from '@/components/home/HowToUse';
import Section from '@/components/home/Section';
import TopBrands from '@/components/home/TopBrands';
import { Spacer } from '@growth-ui/react';
import { useContext } from 'react';
import GPoints from '@/components/gpoints';
import styled from 'styled-components';

const AppContainerCustom = styled(AppContainer)`
  padding-bottom: 0px;
`;

const SectionCustom = styled(Section)`
  padding-bottom: 0px;
`;

const MobileNoSpacer = styled(Spacer)`
  ${({ theme }) => theme.gui.media.mobile} {
    display: none;
  }
`;

export default function Home() {
  const { country } = useContext(AppContext);

  return (
    <>
      <Head />
      <AppHeader bgTransition hideOnMobile={false} />
      <AppMain>
        <Hero />
        <AppContainerCustom>
          <SectionCustom>
            <HomeContent />
            {country === 'KR' && <GPoints />}
            <MobileNoSpacer size={50} />

            <Categories />
            <MobileNoSpacer size={50} />

            {country === 'US' && (
              <>
                <TopBrands />
                <Spacer size={50} />
              </>
            )}
            <Spacer size={50} />

            <HowToUse />
            <MobileNoSpacer size={50} />
          </SectionCustom>
        </AppContainerCustom>
      </AppMain>
      <AppNav />
    </>
  );
}
