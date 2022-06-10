import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Head from 'next/head';
import Image from 'next/image';
import { KeyboardArrowDown } from '@mui/icons-material';
import Logo from '@/asset/logo.png';
import { Typography, Grid, Box } from '@mui/material';
import NextImage from 'next/image';
import { useStyles } from '../../styles/pages/singleBrandList';
import Pursegirl from '../../asset/pursegirl.jpg';
import shinshage from '../../asset/shinshage.jpg';
import Layout from '@/components/layout/Layout';
import BrandCard from '../../components/BrandCard';
import brand1 from '../../asset/categ6.jpg';
import brand2 from '../../asset/categ17.jpg';
import brand3 from '../../asset/categ18.jpg';

export default function Home() {
  const classes = useStyles();

  const Data = [
    {
      image: brand1,
      company: `Plants (Delivery)`,
      price: `54.84`,
      title: `Sansevieria Mini H`,
    },
    {
      image: brand2,
      company: `Starbucks`,
      price: `18.05`,
      title: `Perfect Dessert Set`,
    },
    {
      image: brand3,
      company: `Emart`,
      price: `84.37`,
      title: `₩100,000 Gift Card`,
    },
    {
      image: brand1,
      company: `BHC (Chicken)`,
      price: `21.94`,
      title: `Bburinkle Chicken + Bburinkle Cheese Ball + Coke 1.25L`,
    },
    {
      image: brand2,
      company: `Plants (Delivery)`,
      price: `54.84`,
      title: `Sansevieria Mini H`,
    },
    {
      image: brand3,
      company: `Starbucks`,
      price: `18.05`,
      title: `Perfect Dessert Set`,
    },
    {
      image: brand1,
      company: `Emart`,
      price: `84.37`,
      title: `₩100,000 Gift Card`,
    },
    {
      image: brand2,
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
        <div className={classes.singleBrandsContainer}>
          <div className={classes.singleBrandsContainerHeader}>
            <div className={classes.singleBrandsContainerHeaderImage1}>
              <Image src={shinshage}></Image>
            </div>
            <div className={classes.singleBrandsContainerHeaderImage2}>
              <Image src={Pursegirl}></Image>
            </div>
            <div className={classes.singleBrandsContainerHeaderDetails}>
              <Typography variant="h4">Shinsegae</Typography>
              <Typography variant="h6">
                One gift for Shinsegae department stores to E-mart, Starfield
                and more!
              </Typography>
            </div>
          </div>

          <div className={classes.singleBrandsContainerMain}>
            <div className={classes.singleBrandsContainerMainHeader}>
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
