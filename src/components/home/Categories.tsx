/* eslint-disable jsx-a11y/alt-text */
import Carousel from 'react-multi-carousel';
import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { Heading, Margin, Paragraph, Skeleton, Spacer } from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import { size } from '@/modules/brandingTheme';
import { useGetCategoriesQuery } from '@/services';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: size.maxWidth },
    items: 6,
  },
  tablet: {
    breakpoint: { max: size.maxWidth, min: 0 },
    items: 4,
  },
  // mobile: {
  //   breakpoint: { max: 600, min: 0 },
  //   items: 4,
  // },
};

const MarginWithHover = styled(Margin)`
  transition: all 0.4s ease-in-out;
  

  &:hover {
    text-decoration: underline;
    color: #BF7582;
  }
`;

const Image = styled.div<{ imageUrl: string }>`
  background-image: url(${({ imageUrl }) => imageUrl});
  border-radius: 5px;
  min-width: 100%;
  box-shadow: 0 0 12px 0 rgb(89 102 109 / 15%);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;

  &:before {
    display: inline-block;
    min-width: 100%;
    height: 0;
    padding-bottom: 90%;
    content: '';
  }
`;

const Wrapper = styled.section`
  margin: 50px 0;

  ${({ theme }) => theme.gui.media.mobile} {
    .react-multi-carousel-item {
      // min-width: 320px;
    }
  }
`;

export default function Categories() {
  const { data, loading } = useGetCategoriesQuery();

  const handleRoute = (route: string) => () => {
    Router.push(`${ROUTES.categories}/${route}`);
  };

  return (
    <Wrapper>
      <Heading as="h2">Categories</Heading>
      <Carousel
        draggable
        swipeable
        ssr
        infinite
        partialVisible
        removeArrowOnDeviceType={['tablet', 'mobile']}
        responsive={responsive}
      >
        {loading &&
          new Array(10).fill(0).map((_, idx) => (
            <Margin all={0.5} key={idx}>
              <Skeleton width="100%" style={{ paddingBottom: '90%' }} />
              <Spacer size={5} />
              <Skeleton width="100px" height="1em" />
            </Margin>
          ))}

        {data?.map((cat, idx) => (
          <MarginWithHover all={0.5} key={idx}>
            <Image
              imageUrl={cat.imageUrls.medium}
              style={{ cursor: 'pointer' }}
              onClick={handleRoute(cat.slug)}
            />
            <Spacer size={5} />
            <Paragraph fontSize="xs" style={{ fontWeight: 600 }}>
              {cat.name}
            </Paragraph>
          </MarginWithHover>
        ))}
      </Carousel>
    </Wrapper>
  );
}
