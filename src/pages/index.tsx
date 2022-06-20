import styles from '@/styles/Home.module.css';
import Layout from '@/components/layout/Layout';
import Banner from '@/components/Views/Banner';
import BrandCarousal from '@/components/Views/BrandCarousal';
import GiftSection from '@/components/Views/GiftSection';
import Categories from '@/components/Views/Categories';
import PopularGift from '@/components/Views/PopularGift';
import TopBrand from '@/components/Views/TopBrand';
import Reviews from '@/components/Views/Reviews';
import HowTo from '@/components/Views/HowTo';
import useTranslation from 'next-translate/useTranslation';
import GPoints from '@/components/Gpoint';

export default function Home() {
  const { lang } = useTranslation();

  return (
    <Layout>
      <div className="home-main">
        {lang === 'ko' && <GPoints />}
        <Banner />
        <BrandCarousal />
        <GiftSection />
        <Categories />
        <PopularGift />
        <TopBrand />
        <HowTo />
        <Reviews />
      </div>
    </Layout>
  );
}
