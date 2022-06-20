import Image from 'next/image';
import React from 'react';

import { useStyles } from '../../styles/components/BrandCardStyle';

const BrandCard = ({ data }: any) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.BannerDiv}>
        <Image alt={`image`} src={data?.banner} className={classes.banner} />
      </div>
      <div className={classes.logoDiv}>
        <Image alt={`image`} src={data?.logo} className={classes.logo} />
      </div>

      <div className={classes.infoDiv}>
        <h3>{data?.name}</h3>
      </div>
    </div>
  );
};

export default BrandCard;
