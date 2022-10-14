import Grid from '@/modules/components/Grid';
import Link from 'next/link';
import React from 'react';
import TopBrandItem from './TopBrandItem';
import { Image, ImageList, Paragraph, Spacer } from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import Router from 'next/router';
import { style } from '@mui/system';
import styled from 'styled-components';

const ImgListItem = styled(ImageList.Item)`
  transition: all 0.7s ease-in-out;
  border-radius: 16px 16px 0 0;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const TOP_BRANDS = [
  {
    logoUrl: '/images/starbucks.jpg',
    name: 'Starbucks',
    backgroundUrl: '/images/starbucks-background.jpg',
    link: `${ROUTES.brands}/starbucks`,
  },
  {
    logoUrl: '/images/brands/52092098195124.jpg',
    name: 'Target',
    backgroundUrl: '/images/brands/52092456052821.jpg',
    link: `${ROUTES.brands}/target`,
  },
  // {
  //   logoUrl: '/images/amazon.jpeg',
  //   name: 'Amazon',
  //   backgroundUrl: '/images/amazon-background.jpeg',
  //   link: `${ROUTES.brands}/amazon`,
  // },
  {
    logoUrl: '/images/buffalo-wild-wings.jpeg',
    name: 'Buffalo Wild Wings',
    backgroundUrl: '/images/buffalo-wild-wings-background.jpeg',
    link: `${ROUTES.brands}/buffalo-wild-wings`,
  },
  {
    logoUrl: '/images/staples.jpg',
    name: 'Staples',
    backgroundUrl: '/images/staples-background.jpg',
    link: `${ROUTES.brands}/staples`,
  },
  {
    logoUrl: '/images/sephora.jpg',
    name: 'Sephora',
    backgroundUrl: '/images/sephora-background.jpg',
    link: `${ROUTES.brands}/sephora`,
  },
  {
    logoUrl: '/images/uber.jpg',
    name: 'Uber',
    backgroundUrl: '/images/uber-background.jpg',
    link: `${ROUTES.brands}/uber`,
  },
  {
    logoUrl: '/images/amc-theatres.jpg',
    name: 'Amc Theatres',
    backgroundUrl: '/images/amc-theatres-background.jpg',
    link: `${ROUTES.brands}/amc-theatres`,
  },
  {
    logoUrl: '/images/walmart.jpg',
    name: 'Walmart',
    backgroundUrl: '/images/walmart-background.jpg',
    link: `${ROUTES.brands}/walmart`,
  },
];

export default function TopBrands() {
  return (
    <section>
      <Paragraph fontWeight={600} fontSize={24}>
        Top Brands
      </Paragraph>
      <Spacer size={40} />
      <ImageList
        gap={15}
        responsive={{
          mobile: {
            breakpoint: 767,
            min: 200,
          },
        }}
      >
        {TOP_BRANDS.map((brand) => (
          <ImgListItem
            key={brand.name}
            onClick={() => Router.push(brand.link)}
          >
            <Image src={brand.backgroundUrl} alt={brand.name} />
            <ImageList.ItemBar title={brand.name} thumbnail={brand.logoUrl} />
          </ImgListItem>
        ))}
      </ImageList>
    </section>
  );
}
