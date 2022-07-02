import React, { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import CategoryList from './CategoryList';
import CategoryMobileList from './CategoryMobileList';
import { useStyles } from '../../styles/components/CategorySectionStyle';

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
