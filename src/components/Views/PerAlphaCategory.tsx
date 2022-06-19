import React from 'react';
import Grid from '@mui/material/Grid';

import { useStyles } from '@/styles/components/PerAlphaCategoryStyle';
import CategoryCard from './CategoryCard';

const PerAlphaCategory = ({ data, heading }: any) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <h2 className={classes.heading}>{heading}</h2>
        <Grid container columns={12} className={classes.grid}>
          {data?.map((cat: any, index: number) => (
            <Grid item lg={4} key={index}>
              <CategoryCard data={cat} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default PerAlphaCategory;
