import React, { useEffect, useState } from 'react';

import { useStyles } from '../../styles/components/CategoriesStyle';

import categ1 from '../../asset/categ1.jpg';
import categ2 from '../../asset/categ2.jpg';
import categ3 from '../../asset/categ3.jpg';
import categ4 from '../../asset/categ4.jpg';
import categ5 from '../../asset/categ5.jpg';
import categ6 from '../../asset/categ6.jpg';
import categ7 from '../../asset/categ7.jpg';
import categ8 from '../../asset/categ8.jpg';
import categ9 from '../../asset/categ9.jpg';
import categ10 from '../../asset/categ10.jpg';
import categ11 from '../../asset/categ11.jpg';
import categ12 from '../../asset/categ12.jpg';
import categ13 from '../../asset/categ13.jpg';
import categ14 from '../../asset/categ14.jpg';
import categ15 from '../../asset/categ15.jpg';
import categ16 from '../../asset/categ16.jpg';
import SimpleCategoryCard from './SimpleCategoryCard';
import { getCategories } from '@/redux/actions/authActions';

const Data = [
  {
    image: categ1,
    title: `Coffee & Drinks`,
  },
  {
    image: categ2,
    title: `Cakes & Desserts`,
  },
  {
    image: categ3,
    title: `Flowers & Plants & Fruit Hampers`,
  },
  {
    image: categ4,
    title: `Gift Sets`,
  },
  {
    image: categ5,
    title: `Health Supplements`,
  },
  {
    image: categ6,
    title: `Shopping`,
  },
  {
    image: categ7,
    title: `Grocery`,
  },
  {
    image: categ8,
    title: `Fast Food`,
  },
  {
    image: categ9,
    title: `Korean Food`,
  },
  {
    image: categ10,
    title: `Convenience Stores`,
  },
  {
    image: categ11,
    title: `Hotel & Restaurants`,
  },
  {
    image: categ12,
    title: `Entertainment & Games`,
  },
  {
    image: categ13,
    title: `Beauty & Hair`,
  },
  {
    image: categ14,
    title: `Meal Kits`,
  },
  {
    image: categ15,
    title: `Small Appliance`,
  },
  {
    image: categ16,
    title: `Home & Kitchen`,
  },
];

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
          <SimpleCategoryCard key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
