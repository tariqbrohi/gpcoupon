import Head from 'next/head';
import Image from 'next/image';
import Logo from '@/asset/logo.png';
import { Typography } from '@mui/material';

import styles from '@/styles/Home.module.css';
import Layout from '@/components/layout/Layout';
import Banner from '@/components/Views/Banner';
import BrandCarousal from '@/components/Views/BrandCarousal';
import GiftSection from '@/components/Views/GiftSection';
import Categories from '@/components/Views/Categories';
import PopularGift from '@/components/Views/PopularGift';
import TopBrand from '@/components/Views/TopBrand';
import Reviews from '@/components/Views/Reviews';
import Download from '@/components/Views/Download';
import HowTo from '@/components/Views/HowTo';


export default function Home() {
  return (
    <Layout>
      <div className="home-main">
        <Banner />
        <BrandCarousal />
        <GiftSection />
        <Categories />
        <PopularGift />
        <TopBrand />
        <Reviews />
        <HowTo />
        <Download />
      </div>
    </Layout>
  );
}
