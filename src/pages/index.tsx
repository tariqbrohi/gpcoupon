import Layout from '@/components/layout/Layout';
// import Banner from '@/components/Views/Banner';
// import BrandCarousal from '@/components/Views/BrandCarousal';
// import GiftSection from '@/components/Views/GiftSection';
// import Categories from '@/components/Views/Categories';
// import PopularGift from '@/components/Views/PopularGift';
// import TopBrand from '@/components/Views/TopBrand';
import Reviews from '@/components/Views/Reviews';
// import HowTo from '@/components/Views/HowTo';
// import useTranslation from 'next-translate/useTranslation';
// import GPoints from '@/components/Gpoint';
import { useContext } from 'react';
import AppContext from '@/providers/app-context';
import dynamic from 'next/dynamic';

const Banner = dynamic(() => import('@/components/Views/Banner'), {
  ssr: false,
});
// const GPoints = dynamic(() => import('../components/Gpoint'), {
//   ssr: false,
// });
const Categories = dynamic(() => import('@/components/Views/Categories'), {
  ssr: false,
});
const PopularGift = dynamic(() => import('@/components/Views/PopularGift'), {
  ssr: false,
});

export default function Home() {
  const { country } = useContext(AppContext);

  return (
    <Layout>
      <div className="home-main">
        <Banner />
        {/* <BrandCarousal /> */}
        {/* <GPoints /> */}
        {/* <GiftSection /> */}
        <Categories />
        <PopularGift />
        {/* <TopBrand /> */}
        {/* <HowTo /> */}
        <Reviews />
      </div>
    </Layout>
  );
}
