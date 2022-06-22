import React, { useEffect, useState } from 'react';

import { useStyles } from '../../styles/components/CategoriesStyle';

import SimpleCategoryCard from './SimpleCategoryCard';
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

const Categories = () => {
  const [Categorydata, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      const resp = await getCategories(`voucher_category`);
      setData(resp);
    })();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2 className={classes.heading}>Categories</h2>
      </div>
      <div className={classes.main}>
        {Categorydata?.slice(0, 6)?.map((data: any, index: number) => (
          <SimpleCategoryCard
            key={index}
            data={data}
            img={mapCatToImg[data.filterValueCode]}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
