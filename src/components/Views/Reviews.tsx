import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import Image from 'next/image';



import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import { useStyles } from '../../styles/components/ReviewsStyle';
import image1 from '../../asset/sliderImage1.jpg';
import image2 from '../../asset/sliderImage2.jpg';
import image3 from '../../asset/sliderImage3.jpg';
import image4 from '../../asset/sliderImage4.jpg';


const CardItem = () => {
  const classes = useStyles();
  return (
    <div className={classes.cardDiv}>
      <Card
        className={classes.card}
      >

        <div style={{ display: 'flex', flexDirection: 'row', margin: 35, marginBottom: 0 }}>

          {/* <div style={{ margin: 30, width: 10 }} > */}
          <AccountCircleRoundedIcon style={{ fontSize: 40, margin: 20, marginRight: 5, color: 'grey' }} />
          {/* </div> */}
          <div style={{
            flex: 1,
            textAlign: 'left',
            alignSelf: 'center'
          }}>
            <h4>
              Yasir Ahmed
            </h4>
            <p style={{ fontSize: 14 }}>
              Country here
            </p>
          </div>
        </div>
        <div style={{ marginLeft: 35, marginRight: 35 }}>
          <p style={{ textAlign: 'center' }}>
            "I was so happy to come across your website. I have sent several gifts already to my my family and friends back home. I am looking forward to keep using your service."
          </p>
          <p style={{ textAlign: 'center', padding: 20, fontSize: 12 }}>
            ⭐⭐⭐⭐⭐️
          </p>
        </div>
      </Card>
    </div>
  )
}

const Reviews = () => {
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);

  const handleChange = (cur: number, prev: number) => {
    setIndex(cur);
  };



  function Item({ item }: any) {
    return (
      <div className={classes.itemDiv}>
        <CardItem />
        <CardItem />
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
        <Item />
        <Item />
      </Carousel>
    </div>
  );
};

export default Reviews;
