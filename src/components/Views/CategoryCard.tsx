import React, { useState } from 'react';
import Image from 'next/image';

import { useStyles } from '../../styles/components/CategoryCardStyle';

const CategoryCard = ({ data }: any) => {
  const classes = useStyles();
  return (
    <>
      {data && (
        <div className={classes.container}>
          <div className={classes.head}>
            <div className={classes.logoDiv}>
              <Image alt={`image`} src={data?.logo} className={classes.logo} />
            </div>
            <h2 className={classes.title}>{data?.name}</h2>
          </div>
          <div className={classes.bannerDiv}>
            <Image
              alt={`image`}
              src={data?.banner}
              className={classes.banner}
            />
          </div>
          <p className={classes.para}>{data?.para}</p>
        </div>
      )}
    </>
  );
};

export default CategoryCard;
