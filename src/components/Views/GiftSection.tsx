import React, { useState } from 'react';
import Image from 'next/image';

import { useStyles } from '../../styles/components/GiftSectionStyle';

import gift1 from '../../asset/gift1.jpg';
import gift2 from '../../asset/gift2.jpg';
import gift3 from '../../asset/gift3.jpg';
import gift4 from '../../asset/gift4.jpg';
import gift5 from '../../asset/gift5.jpg';
import gift6 from '../../asset/gift6.jpg';

const Data = [
  {
    image: gift1,
    title: `NEW GIFTS`,
    url: ``,
  },
  {
    image: gift2,
    title: `Birthday Gifts`,
    url: ``,
  },
  {
    image: gift4,
    title: `Delivery Gifts`,
    url: ``,
  },
  {
    image: gift3,
    title: `Wedding Gifts`,
    url: ``,
  },
  {
    image: gift5,
    title: `Under $10`,
    url: ``,
  },
  {
    image: gift6,
    title: `Health Gifts`,
    url: ``,
  },
];

const GiftSection = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.main}>
        {Data?.map((data: any, index: number) => (
          <div key={index} className={classes.imageDiv}>
            <Image src={data?.image} className={classes.image} />
            <h3 className={classes.title}>{data?.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftSection;
