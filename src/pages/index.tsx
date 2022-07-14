import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import Categories from '@/components/home/Categories';
import Head from '@/modules/components/Head';
import Hero from '@/components/home/Hero';
import HomeContent from '@/components/home/HomeContent';
import HowToUse from '@/components/home/HowToUse';
import Section from '@/components/home/Section';
import { Spacer } from '@growth-ui/react';

export default function Home() {
  return (
    <>
      <Head />
      <AppHeader bgTransition hideOnMobile={false} />
      <AppMain>
        <Hero />
        <AppContainer>
          <Section>
            <HomeContent />
            <Spacer size={50} />
            <Categories />
            <Spacer size={50} />
            <HowToUse />
            <Spacer size={130} />
          </Section>
        </AppContainer>
      </AppMain>
      <AppNav />
    </>
  );
}
