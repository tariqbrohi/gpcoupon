import React, { useState } from 'react';
import Image from 'next/image';




import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useStyles } from '../../styles/components/TopBrandStyle';

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



import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
const BasicChips = () => {

  const classes = useStyles();

  return (
    <Stack direction="row" spacing={1} className={classes.stack}>
      <Chip
        className={classes.chip}
        label="
        Coffee/Drinks ☕️
      "
      />

      <Chip
        className={classes.chip}
        label="
        Late Night 🍕🍗
      "
      />
      <Chip
        className={classes.chip}
        label="
        Desserts 🍰
      "
      />
      <Chip
        className={classes.chip}
        label="
        Shopping 🛍️
      "
      />
      <Chip
        className={classes.chipSelected}
        label="
        Delivery 📦
      "
      />

    </Stack>
  );
}

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
  {
    image: categ15,
    title: `Small Appliance2`,
  },
  {
    image: categ16,
    title: `Home & Kitchen2`,
  },
];

const TopBrand = () => {
  const [DataArray, setDataArray] = useState(Data.slice(0, 8));
  const classes = useStyles();

  return (
    <div className={classes.container}>

      <div className={classes.header}>
        <h2 className={classes.heading}>Top Brands</h2>
      </div>


      <div className={classes.header}>

        <BasicChips />
      </div>

      <div className={classes.main}>
        {DataArray?.map((data: any, index: number) => (
          <div className={classes.itemContainer} >
            <div className={classes.itemHeader}>
              <div className={classes.avatarDiv} >
                <Image src={data?.image} className={classes.avatar} />
              </div>
              Startbucks
            </div>
            <div key={index} className={classes.imageDiv}>
              <Image src={data?.image} className={classes.image} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBrand;
