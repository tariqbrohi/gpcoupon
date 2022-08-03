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

export default function Home() {
  const { country } = useContext(AppContext);

  return (
    <>
      <Head />
      <AppHeader bgTransition hideOnMobile={false} />
      <AppMain>
        <Hero />
        <AppContainer>
          <Section>
            <HomeContent />
            {country === 'KR' && <GPoints />}
            <Spacer size={50} />
            <Categories />
            <Spacer size={50} />
            {country === 'US' && (
              <>
                <TopBrands />
                <Spacer size={50} />
              </>
            )}
            <HowToUse />
            <Spacer size={130} />
          </Section>
        </AppContainer>
      </AppMain>
      <AppNav />
    </>
  );
}
