import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import Image from 'next/image';

import { useStyles } from '../../styles/components/PopularGiftStyle';
import image1 from '../../asset/popular1.jpg';
import image2 from '../../asset/popular2.jpg';
import image3 from '../../asset/popular3.jpg';
import image4 from '../../asset/popular4.jpg';
import image5 from '../../asset/popular5.jpg';
import image6 from '../../asset/popular6.jpg';
import image7 from '../../asset/popular7.jpg';
import image8 from '../../asset/popular8.jpg';

const Data = [
  {
    image: image1,
    company: `Plants (Delivery)`,
    price: `54.84`,
    title: `Sansevieria Mini H`,
  },
  {
    image: image2,
    company: `Starbucks`,
    price: `18.05`,
    title: `Perfect Dessert Set`,
  },
  {
    image: image3,
    company: `Emart`,
    price: `84.37`,
    title: `₩100,000 Gift Card`,
  },
  {
    image: image4,
    company: `BHC (Chicken)`,
    price: `21.94`,
    title: `Bburinkle Chicken + Bburinkle Cheese Ball + Coke 1.25L`,
  },
  {
    image: image5,
    company: `Plants (Delivery)`,
    price: `54.84`,
    title: `Sansevieria Mini H`,
  },
  {
    image: image6,
    company: `Starbucks`,
    price: `18.05`,
    title: `Perfect Dessert Set`,
  },
  {
    image: image7,
    company: `Emart`,
    price: `84.37`,
    title: `₩100,000 Gift Card`,
  },
  {
    image: image8,
    company: `BHC (Chicken)`,
    price: `21.94`,
    title: `Bburinkle Chicken + Bburinkle Cheese Ball + Coke 1.25L`,
  },
];

const PopularGift = () => {
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);

  const handleChange = (cur: number, prev: number) => {
    setIndex(cur);
  };

  function Item({ item }: any) {
    return (
      <div className={classes.imageDiv}>
        {item?.map((data: any, index: number) => (
          <div key={index} className={classes.card}>
            <Image
              src={data.image}
              style={{ borderRadius: `16px` }}
              className={classes.image}
            />
            <p className={classes.company}>{data.company}</p>
            <p className={classes.title}>{data.title}</p>
            <p className={classes.price}>US$ {data.price}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={classes.carousaldiv}>
      <h2>🎁 Most Popular Gifts 🎁</h2>
      <Carousel
        index={index}
        onChange={() => handleChange}
        interval={4000}
        animation="slide"
        indicators={false}
        stopAutoPlayOnHover
        swipe
        navButtonsAlwaysVisible
        className={classes.carousal}
      >
        {/* {items.map((item, i) => (
                    <Item key={i} item={item} />
                ))} */}
        <Item item={Data?.slice(0, 4)} />
        <Item item={Data?.slice(4, 8)} />
      </Carousel>
    </div>
  );
};

export default PopularGift;
