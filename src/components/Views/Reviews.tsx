import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';

// import Carousel from 'react-material-ui-carousel';

import Card from '@mui/material/Card';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import { useStyles } from '../../styles/components/ReviewsStyle';

const CardItem = () => {
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
          <AccountCircleRoundedIcon
            style={{ fontSize: 40, margin: 20, marginRight: 5, color: `grey` }}
          />
          {/* </div> */}
          <div
            style={{
              flex: 1,
              textAlign: `left`,
              alignSelf: `center`,
            }}
          >
            <h4>Yasir Ahmed</h4>
            <p style={{ fontSize: 14 }}>Country here</p>
          </div>
        </div>
        <div style={{ marginLeft: 35, marginRight: 35 }}>
          <p style={{ textAlign: `center` }}>
            &quot;I was so happy to come across your website. I have sent
            several gifts already to my my family and friends back home. I am
            looking forward to keep using your service.&quot;
          </p>
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

  function Item({ item }: any) {
    return (
      <div className={classes.itemDiv}>
        <CardItem />
      </div>
    );
  }

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
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </Carousel>
    </div>
  );
};

export default Reviews;
