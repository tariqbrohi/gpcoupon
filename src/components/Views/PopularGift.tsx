import React, { useEffect, useContext } from 'react';
import Router from 'next/router';
import Carousel from 'react-multi-carousel';

import { useStyles } from '../../styles/components/PopularGiftStyle';
import { getVouchers } from '@/redux/actions/authActions';
import AppContext from '@/providers/app-context';
import { AppContextInterface } from '@/annotations/types';

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 4,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 760 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 760, min: 0 },
    items: 1.5,
    slidesToSlide: 1,
  },
};

const PopularGift = (props: any) => {
  const classes = useStyles();
  const [Data, setData] = React.useState([]);

  const { setSingleVoucher, country } = useContext(
    AppContext,
  ) as AppContextInterface;

  useEffect(() => {
    (async () => {
      const data = await getVouchers(`all`, country, 20);
      setData(data);
    })();
  }, []);

  return (
    <div className={classes.carousaldiv}>
      {Array.isArray(Data) && (
        <>
          <h2>🎁 Most Popular Gifts 🎁</h2>
          <Carousel
            swipeable={true}
            draggable={true}
            autoPlay={false}
            shouldResetAutoplay={false}
            showDots={false}
            responsive={responsive}
            infinite={true}
            removeArrowOnDeviceType={[`mobile`]}
            deviceType={props.deviceType}
            className={classes.carousal}
          >
            {Data?.map((item: any, index: number) => (
              <div
                key={index}
                className={classes.imageDiv}
                onClick={() => {
                  setSingleVoucher(item);
                  Router.push({
                    pathname: `/item/${item?.name}`,
                  });
                }}
              >
                <div className={classes.card}>
                  <div
                    style={{ borderRadius: `16px` }}
                    className={classes.image}
                  >
                    <img
                      alt={`image`}
                      src={item?.imageUrl}
                      width={`100%`}
                      height="150px"
                    />
                  </div>
                  <p className={classes.title}>{item?.name}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </>
      )}
    </div>
  );
};

export default PopularGift;
