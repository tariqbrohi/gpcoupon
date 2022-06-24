import React, { useEffect, useContext } from 'react';
// import Carousel from 'react-material-ui-carousel';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
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
  }, [country]);
  // console.log(Data);
  function Item({ item, key }: any) {
    return (
      <div
        className={classes.imageDiv}
        onClick={() => {
          // localStorage.setItem(`voucher`, JSON.stringify(item));
          setSingleVoucher(item);
          Router.push({
            pathname: `/item/${item.name}`,
          });
        }}
      >
        <div className={classes.card}>
          <div style={{ borderRadius: `16px` }} className={classes.image}>
            <img
              alt={`image`}
              src={item.imageUrl}
              width={`100%`}
              height="150px"
            />
          </div>
          {/* <p className={classes.company}>{item.for}</p> */}
          <p className={classes.title}>{item.name}</p>
          {/* <p className={classes.price}>
            G {item?.valueDenominations?.split(`,`)?.[0]}
          </p> */}
        </div>
      </div>
    );
  }

  return (
    <div className={classes.carousaldiv}>
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
        {Data?.map((data: any, index: number) => (
          <Item key={index} item={data} />
        ))}
      </Carousel>
    </div>
  );
};

export default PopularGift;
