import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Head from 'next/head';
import Image from 'next/image';
import { KeyboardArrowDown } from '@mui/icons-material';
import Logo from '@/asset/logo.png';
import { Typography, Grid, Box } from '@mui/material';

import { useStyles } from '../../styles/pages/singleCategoryList';
import Pursegirl from '../../asset/pursegirl.jpg';
import shinshage from '../../asset/shinshage.jpg';
import Layout from '@/components/layout/Layout';
import BrandCard from '../../components/BrandCard';
import category1 from '../../asset/category19.jpg';
import category2 from '../../asset/category20.jpg';
import category3 from '../../asset/category21.jpg';
import category4 from '../../asset/category22.jpg';
import category5 from '../../asset/category23.jpg';
import category6 from '../../asset/category24.jpg';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
export default function Home() {
  const classes = useStyles();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 9,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 8,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };
  const Data = [
    {
      image: category1,
      company: `Plants (Delivery)`,
      price: `54.84`,
      title: `Sansevieria Mini H`,
    },
    {
      image: category2,
      company: `Starbucks`,
      price: `18.05`,
      title: `Perfect Dessert Set`,
    },
    {
      image: category3,
      company: `Emart`,
      price: `84.37`,
      title: `₩100,000 Gift Card`,
    },
    {
      image: category4,
      company: `BHC (Chicken)`,
      price: `21.94`,
      title: `Bburinkle Chicken + Bburinkle Cheese Ball + Coke 1.25L`,
    },
    {
      image: category5,
      company: `Plants (Delivery)`,
      price: `54.84`,
      title: `Sansevieria Mini H`,
    },
    {
      image: category6,
      company: `Starbucks`,
      price: `18.05`,
      title: `Perfect Dessert Set`,
    },
    {
      image: category1,
      company: `Emart`,
      price: `84.37`,
      title: `₩100,000 Gift Card`,
    },
    {
      image: category2,
      company: `BHC (Chicken)`,
      price: `21.94`,
      title: `Bburinkle Chicken + Bburinkle Cheese Ball + Coke 1.25L`,
    },
  ];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.layoutWrapper}>
      <Layout>
        <div className={classes.singleCategoriesContainer}>
          <div className={classes.singleCategoriesContainerHeader}>
            {/* <div className={classes.singleCategoriesContainerHeaderImage1}>
              <Image src={shinshage}></Image>
            </div>
            <div className={classes.singleCategoriesContainerHeaderImage2}>
              <Image src={Pursegirl}></Image>
            </div> */}
            <div className={classes.singleCategoriesContainerHeaderDetails}>
              <Typography variant="h3">Coffee & Drinks</Typography>
              <Carousel
                responsive={responsive}
                //   className={classes.stepCarousel}
                autoPlay={false}
                swipeable={true}
                draggable={true}
                showDots={false}
                // ssr={true}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      width: '7rem',
                      height: '7rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: '#7b7b7b',
                      backgroundColor: '#ebebeb',
                      borderRadius: '1.4rem',
                    }}
                  >
                    All
                  </div>
                  <Typography variant="body2">All Brands</Typography>
                </div>
                {Data.map((item) => (
                  <div
                    className={
                      classes.singleCategoriesContainerHeaderCarouselItem
                    }
                  >
                    <div
                      className={
                        classes.singleCategoriesContainerHeaderCarouselItemImage
                      }
                    >
                      <Image src={item?.image} />
                    </div>
                    <Typography variant="body2">{item?.title}</Typography>
                  </div>
                ))}

                <div
                  className={
                    classes.singleCategoriesContainerHeaderCarouselItem
                  }
                >
                  <div
                    className={
                      classes.singleCategoriesContainerHeaderCarouselItemImage
                    }
                  >
                    <Image src={category1} />
                  </div>
                  <Typography variant="body2">All Brands</Typography>
                </div>
              </Carousel>
            </div>
          </div>

          <div className={classes.singleCategoriesContainerMain}>
            <div className={classes.singleCategoriesContainerMainHeader}>
              <Typography variant="h6">Result 10</Typography>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ color: 'black' }}
                disableRipple
                endIcon={<KeyboardArrowDown style={{ color: 'black' }} />}
              >
                Most Popular
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>Most Popular</MenuItem>
                <MenuItem onClick={handleClose}>Price: Low to High</MenuItem>
                <MenuItem onClick={handleClose}>Price: High to Low</MenuItem>
              </Menu>
            </div>
            <div className={classes.root}>
              <div className={classes.productsContainer}>
                {Data.map((item) => (
                  <div>
                    <BrandCard data={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
