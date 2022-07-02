import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import Categories from '@/components/home/Categories';
import dynamic from 'next/dynamic';
import Head from '@/modules/components/Head';
import Hero from '@/components/home/Hero';
import HomeContent from '@/components/home/HomeContent';
import HowToUse from '@/components/home/HowToUse';
import TempHowToUse from '@/components/HowToUse';
import Layout from '@/components/layout/Layout';
import Reviews from '@/components/Views/Reviews';
import Section from '@/components/home/Section';
import Spacer from '@/components/Spacer';
// import Banner from '@/components/Views/Banner';
// import BrandCarousal from '@/components/Views/BrandCarousal';
// import GiftSection from '@/components/Views/GiftSection';
// import Categories from '@/components/Views/Categories';
// import PopularGift from '@/components/Views/PopularGift';
// import TopBrand from '@/components/Views/TopBrand';
// import HowTo from '@/components/Views/HowTo';
// import useTranslation from 'next-translate/useTranslation';
// import GPoints from '@/components/Gpoint';

const Banner = dynamic(() => import('@/components/Views/Banner'), {
  ssr: false,
});
const GPoints = dynamic(() => import('../components/Gpoint'), {
  ssr: false,
});
// const Categories = dynamic(() => import('@/components/Views/Categories'), {
//   ssr: false,
// });
const PopularGift = dynamic(() => import('@/components/Views/PopularGift'), {
  ssr: false,
});

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
            <HowToUse />
            <Spacer size={30} />
            <TempHowToUse />
            <Spacer size={100} />
          </Section>
        </AppContainer>
      </AppMain>
      <AppNav />
    </>
  );
}

// <Layout>
//   <div className="home-main">
//     {/* <Banner /> */}
//     {/* <BrandCarousal /> */}
//     {/* <GPoints /> */}
//     {/* <GiftSection /> */}
//     {/* <Categories />
//             <PopularGift /> */}
//     {/* <TopBrand /> */}
//     {/* <HowTo /> */}
//     {/* <Reviews /> */}
//   </div>
// </Layout>;
