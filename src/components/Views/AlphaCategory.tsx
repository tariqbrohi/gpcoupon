import React from 'react';

import { useStyles } from '@/styles/components/AlphaCategoryStyle';
import PerAlphaCategory from './PerAlphaCategory';

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
import { Divider } from '@mui/material';

const Data = [
  {
    logo: brand1,
    name: `Shinsegae`,
    banner: bi1,
    para: `One gift for Shinsegae department stores to E-mart, Starfield and more!`,
  },
  {
    logo: brand2,
    name: `Lotte`,
    banner: bi2,
    para: `Gift card can be used at all Lotte department stores, Lotte Super, Lotte Mart and even Lotte World!`,
  },
  {
    logo: brand3,
    name: `Hyundai`,
    banner: bi3,
    para: `One gift for Shinsegae department stores to E-mart, Starfield and more!`,
  },
  {
    logo: brand4,
    name: `Galleria`,
    banner: bi4,
    para: `One gift for Shinsegae department stores to E-mart, Starfield and more!`,
  },
  {
    logo: brand5,
    name: `Lotte Mart`,
    banner: bi5,
    para: `One gift for Shinsegae department stores to E-mart, Starfield and more!`,
  },
  {
    logo: brand6,
    name: `EMart`,
    banner: bi6,
    para: `One gift for Shinsegae department stores to E-mart, Starfield and more!`,
  },
  {
    logo: brand1,
    name: `Shinsegae`,
    banner: bi1,
    para: `One gift for Shinsegae department stores to E-mart, Starfield and more!`,
  },
  {
    logo: brand2,
    name: `Lotte`,
    banner: bi2,
    para: `Gift card can be used at all Lotte department stores, Lotte Super, Lotte Mart and even Lotte World!`,
  },
];

const AlphaCategory = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <PerAlphaCategory data={Data?.slice(0, 4)} heading="#" />
        <Divider />
        <PerAlphaCategory data={Data?.slice(4, 7)} heading="A" />
        <Divider />
        <PerAlphaCategory data={Data?.slice(2, 4)} heading="B" />
        <Divider />
        <PerAlphaCategory data={Data?.slice(3, 8)} heading="C" />
      </div>
    </div>
  );
};

export default AlphaCategory;
