import React, { useState } from 'react';
// import Carousel from 'react-material-ui-carousel';
import Image from 'next/image';

import Carousel from 'react-multi-carousel';

import { useStyles } from '../../styles/components/BrandCarousalStyle';
import image1 from '../../asset/sliderImage1.jpg';
import image2 from '../../asset/sliderImage2.jpg';
import image3 from '../../asset/sliderImage3.jpg';
import image4 from '../../asset/sliderImage4.jpg';

const BrandCarousal = (props: any) => {
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);

  const handleChange = (cur: number, prev: number) => {
    if (cur) setIndex(cur);
    else setIndex(prev);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 1024, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  function Item({ item }: any) {
    return (
      <div className={classes.imageDiv}>
        <Image
          src={item[0]}
          style={{ borderRadius: `16px` }}
          className={classes.image}
        />
        {/* <Image
          src={item[1]}
          style={{ borderRadius: `16px` }}
          className={classes.image}
        /> */}
      </div>
    );
  }

  return (
    <div className={classes.carousaldiv}>
      <Carousel
        swipeable={false}
        draggable={false}
        autoPlay={false}
        showDots={true}
        responsive={responsive}
        infinite={true}
        removeArrowOnDeviceType={['mobile']}
        deviceType={props.deviceType}
        className={classes.carousal}
      >
        <Item item={[image1]} />
        <Item item={[image2]} />
        <Item item={[image3]} />
        <Item item={[image4]} />
      </Carousel>
      {/* <Carousel
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
        
        <Item item={[image1, image2]} />
        <Item item={[image3, image4]} />
      </Carousel> */}
    </div>
  );
};

export default BrandCarousal;
