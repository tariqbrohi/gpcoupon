import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import Image from 'next/image';

import { useStyles } from '../../styles/components/BrandCarousalStyle';
import image1 from '../../asset/sliderImage1.jpg';
import image2 from '../../asset/sliderImage2.jpg';
import image3 from '../../asset/sliderImage3.jpg';
import image4 from '../../asset/sliderImage4.jpg';

const BrandCarousal = () => {
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);

  const handleChange = (cur: number, prev: number) => {
    if (cur) setIndex(cur);
    else setIndex(prev);
  };

  function Item({ item }: any) {
    return (
      <div className={classes.imageDiv}>
        <Image
          src={item[0]}
          style={{ borderRadius: `16px` }}
          className={classes.image}
        />
        <Image
          src={item[1]}
          style={{ borderRadius: `16px` }}
          className={classes.image}
        />
      </div>
    );
  }

  return (
    <div className={classes.carousaldiv}>
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
        <Item item={[image1, image2]} />
        <Item item={[image3, image4]} />
      </Carousel>
    </div>
  );
};

export default BrandCarousal;
