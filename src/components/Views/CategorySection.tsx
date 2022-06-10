import React, { useState } from 'react';
import Grid from '@mui/material/Grid';

import CategoryCard from './CategoryCard';
import CategoryList from './CategoryList';
import CategoryMobileList from './CategoryMobileList';
import { useStyles } from '../../styles/components/CategorySectionStyle';

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

const Data = [
  {
    logo: brand1,
    name: `Shinsegae`,
    banner: bi1,
    para: 'One gift for Shinsegae department stores to E-mart, Starfield and more!',
  },
  {
    logo: brand2,
    name: `Lotte`,
    banner: bi2,
    para: 'Gift card can be used at all Lotte department stores, Lotte Super, Lotte Mart and even Lotte World!',
  },
  {
    logo: brand3,
    name: `Hyundai`,
    banner: bi3,
    para: 'One gift for Shinsegae department stores to E-mart, Starfield and more!',
  },
  {
    logo: brand4,
    name: `Galleria`,
    banner: bi4,
    para: 'One gift for Shinsegae department stores to E-mart, Starfield and more!',
  },
  {
    logo: brand5,
    name: `Lotte Mart`,
    banner: bi5,
    para: 'One gift for Shinsegae department stores to E-mart, Starfield and more!',
  },
  {
    logo: brand6,
    name: `EMart`,
    banner: bi6,
    para: 'One gift for Shinsegae department stores to E-mart, Starfield and more!',
  },
];

const CategorySection = () => {
  const classes = useStyles();
  const [heading, setheading] = useState('All');
  return (
    <div className={classes.container}>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12} className={classes.catMobileFilter}>
          <CategoryMobileList setheading={setheading} heading={heading} />
        </Grid>

        <Grid item md={3} className={classes.catFilter}>
          <CategoryList setheading={setheading} heading={heading} />
        </Grid>
        <Grid item xs={12} md={9}>
          <h2 className={classes.heading}>{heading}</h2>
          <p className={classes.total}>
            Total {Math.floor(Math.random() * 100)}
          </p>
          <Grid container spacing={2} columns={12}>
            {Data?.map((data) => (
              <Grid xs={6}>
                <CategoryCard data={data} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CategorySection;
