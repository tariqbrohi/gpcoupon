import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

import Layout from '@/components/layout/Layout';
import { useStyles } from '../../styles/pages/CategoriesStyle';
import SimpleCategoryCard from '@/components/Views/SimpleCategoryCard';

import BrandCard from '@/components/Views/BrandCard';
import bi1 from '../../asset/bi1.jpg';
import bi2 from '../../asset/bi2.jpg';
import bi3 from '../../asset/bi3.png';
import bi4 from '../../asset/bi4.png';
import bi5 from '../../asset/bi5.jpg';
import bi6 from '../../asset/bi6.jpg';

import brand1 from '../../asset/brand1.jpg';
import brand2 from '../../asset/brand2.jpg';
import brand3 from '../../asset/brand3.jpg';
import brand4 from '../../asset/brand4.jpg';
import brand5 from '../../asset/brand5.jpg';
import brand6 from '../../asset/brand6.jpg';
import { getCategories } from '@/redux/actions/authActions';

const mapCatToImg = {
  apparel_fashion_accessories: `/categories/Apparel.jpg`,
  automobile: `/asset/categ1.jpg`,
  baby_kids: `/categories/Apparel.jpg`,
  beauty_health_wellness: `/categories/HealthNBeauty.jpg`,
  books_magazines_subscriptions: `/categories/Games.jpg`,
  cash_cards: `/categories/AllGiftCards.jpg`,
  deals_subscriptions: `/asset/categ1.jpg`,
  e_learning: `/asset/categ1.jpg`,
  ecommerce: `/categories/Ecommerce.jpg`,
  electronics: `/categories/Electronics.jpg`,
  experiences: `/categories/Experiences.jpg`,
  experiences_test: `/asset/categ1.jpg`,
  financial_services: `/asset/categ1.jpg`,
  fintech: `/categories/VoIP.jpg`,
  grocery_and_retail: `/categories/Groceries.jpg`,
  health_and_wellness: `/categories/HealthNBeauty.jpg`,
  home_living: `/categories/Home.jpg`,
  in_house_benefits: `/asset/categ1.jpg`,
  insurance: `/asset/categ1.jpg`,
  jewelry_lifestyle: `/categories/Gifts.jpg`,
  learning: `/asset/categ1.jpg`,
  lists_of_common_category: `/asset/categ1.jpg`,
  merchandise: `/categories/Retail.jpg`,
  mobile_recharges: `/asset/categ1.jpg`,
  music_movies_and_entertainment: `/categories/Entertainment.jpg`,
  news: `/asset/categ1.jpg`,
  online_gifts: `/categories/AllGiftCards.jpg`,
  papers_and_books: `/categories/Pets.jpg`,
  philanthropy: `/asset/categ1.jpg`,
  prepaid_cards: `/categories/AllGiftCards.jpg`,
  restaurants_foods_and_drinks: `/categories/Food.jpg`,
  software_and_licensing: `/categories/Streaming.jpg`,
  sports_and_fitness: `/asset/categ1.jpg`,
  travel_and_tourism: `/categories/Travel.jpg`,
  work_from_home: `/categories/Restaurants.jpg`,
} as Record<string, string>;

const BrandData = [
  {
    logo: brand1,
    name: `Shinsegae`,
    banner: bi1,
  },
  {
    logo: brand2,
    name: `Lotte`,
    banner: bi2,
  },
  {
    logo: brand3,
    name: `Hyundai`,
    banner: bi3,
  },
  {
    logo: brand4,
    name: `Galleria`,
    banner: bi4,
  },
  {
    logo: brand5,
    name: `Lotte Mart`,
    banner: bi5,
  },
  {
    logo: brand6,
    name: `EMart`,
    banner: bi6,
  },
  {
    logo: brand1,
    name: `Shinsegae`,
    banner: bi1,
  },
  {
    logo: brand2,
    name: `Lotte`,
    banner: bi2,
  },
];

const Categories = () => {
  const classes = useStyles();
  const [Categorydata, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const resp = await getCategories(`voucher_category`);
      setData(resp);
    })();
  }, []);

  return (
    <Layout>
      <div className={classes.container}>
        <div className={classes.main}>
          <h2 className={classes.heading}>Categories</h2>
          <Grid container columns={12}>
            {Categorydata?.map((data: any, index: number) => (
              <Grid key={index} item xs={12} sm={4} md={3} lg={2}>
                <SimpleCategoryCard
                  data={data}
                  img={mapCatToImg[data.filterValueCode]}
                />
              </Grid>
            ))}
          </Grid>
          {/* <h2 className={classes.heading}>Popular Brands</h2>
          <Grid container spacing={2} columns={12} className={classes.grid2}>
            {BrandData?.map((data: any, index: number) => (
              <Grid key={index} item xs={12} sm={4} md={3} lg={3}>
                <BrandCard data={data} />
              </Grid>
            ))}
          </Grid> */}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
