import React, { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

import CategoryCard from './CategoryCard';
import BrandCard from '../BrandCard';
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
import { getVouchers } from '@/redux/actions/authActions';
import AppContext from '@/providers/app-context';
import { AppContextInterface } from '@/annotations/types';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';
import SimpleAffiliateCard from './SimpleAffiliateCard';

const CategorySection = () => {
  const { country } = useContext(AppContext) as AppContextInterface;
  const { lang } = useTranslation();
  const classes = useStyles();
  const [Data, setData] = useState([]);
  const [Category, setCategory] = useState({
    name: `All`,
    code: `all`,
  });

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `/api/brands?country=${lang}&category=${Category.code}`,
      );

      setData(data);
      console.log(data);
    } catch {
      setData([]);
    }
    // const resp = await getVouchers(Category.code, country, `all`);
    // console.log(`resp`, resp);
    // setData(resp);
  };

  useEffect(() => {
    getData();
  }, [Category]);

  return (
    <div className={classes.container}>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12} className={classes.catMobileFilter}>
          <CategoryMobileList setCategory={setCategory} Category={Category} />
        </Grid>

        <Grid item md={3} className={classes.catFilter}>
          <CategoryList setCategory={setCategory} Category={Category} />
        </Grid>
        <Grid item xs={12} md={8}>
          <h2 className={classes.heading}>{Category?.name}</h2>
          <p className={classes.total}>Total {Data?.length}</p>
          <Grid container spacing={2} columns={12}>
            {Data?.map((item: any) => (
              <SimpleAffiliateCard data={item} key={item.id} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CategorySection;
