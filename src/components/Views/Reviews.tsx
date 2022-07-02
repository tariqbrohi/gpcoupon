import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';

// import Carousel from 'react-material-ui-carousel';

import Card from '@mui/material/Card';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import { useStyles } from '../../styles/components/ReviewsStyle';
import Spacer from '../Spacer';

const reviews = [
  {
    body: "Just started using this website and I've already found a lot of awesome coupons. Definitely looking forward to coming back every so often to see what else is new. 5/5",
    author: 'Jacob Siegel',
  },
  {
    body: "I think this coupon is worth five stars. That's the Amazing Coupon for me ! It's a thing of value. I highly recommend it.",
    author: 'Chloe Lee',
  },
  {
    body: 'Great choice for last minute gifts, definitely recommend!',
    author: 'Misael Calvillo',
  },
  {
    body: "I highly recommend GCoupon if you're a smart shopper The fact that I can redeem my coupon whenever is the gift that keeps on giving!",
    author: 'Evandro DaSilva',
  },
  {
    body: 'So many coupons to pick from! definitely makes it easy when gifting for special occasions, not to mention super fast! I come here every time lol. 5 stars',
    author: 'Ana C.',
  },
  {
    body: '5 Stars The perfect gift for my boyfriend! Super easy to reload. Love it <3',
    author: 'My Le',
  },
];

const CardItem = ({ body, author }: any) => {
  const classes = useStyles();

  return (
    <div className={classes.cardDiv}>
      <Card className={classes.card}>
        <div
          style={{
            display: `flex`,
            flexDirection: `row`,
            margin: 35,
            marginBottom: 0,
          }}
        >
          {/* <div style={{ margin: 30, width: 10 }} > */}
          {/* <AccountCircleRoundedIcon
            style={{ fontSize: 40, margin: 20, marginRight: 5, color: `grey` }}
          /> */}
          {/* </div> */}
          <div
            style={{
              flex: 1,
              textAlign: `left`,
              alignSelf: `center`,
            }}
          >
            <h4>{author}</h4>
            {/* <p style={{ fontSize: 14 }}>Country here</p> */}
          </div>
        </div>

        <Spacer size={20} />
        <div style={{ marginLeft: 35, marginRight: 35 }}>
          <p style={{ textAlign: `center` }}>&quot;{body}&quot;</p>
          <p style={{ textAlign: `center`, padding: 20, fontSize: 12 }}>
            ⭐⭐⭐⭐⭐️
          </p>
        </div>
      </Card>
    </div>
  );
};

const Reviews = (props: any) => {
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);

  const handleChange = (cur: number, prev: number) => {
    setIndex(cur);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 2,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 760 },
      items: 1.5,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 760, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className={classes.carousaldiv}>
      <Carousel
        swipeable={true}
        draggable={false}
        autoPlay={false}
        showDots={true}
        responsive={responsive}
        infinite={true}
        removeArrowOnDeviceType={[`tablet`, `mobile`]}
        deviceType={props.deviceType}
        className={classes.carousal}
      >
        {reviews.map((review) => (
          <div className={classes.itemDiv} key={review.author}>
            <CardItem {...review} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Reviews;
