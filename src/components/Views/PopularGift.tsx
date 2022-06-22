import React, { useEffect, useContext } from 'react';
// import Carousel from 'react-material-ui-carousel';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
// import Carousel from 'react-multi-carousel';

import { useStyles } from '../../styles/components/PopularGiftStyle';
import image1 from '../../asset/popular1.jpg';
import image2 from '../../asset/popular2.jpg';
import image3 from '../../asset/popular3.jpg';
import image4 from '../../asset/popular4.jpg';
import image5 from '../../asset/popular5.jpg';
import image6 from '../../asset/popular6.jpg';
import image7 from '../../asset/popular7.jpg';
import image8 from '../../asset/popular8.jpg';
import { getVouchers } from '@/redux/actions/authActions';
import AppContext from '@/providers/app-context';
import { AppContextInterface } from '@/annotations/types';

const DataCarousel = [
  {
    image: image1,
    company: `Plants (Delivery)`,
    price: `54.84`,
    title: `Sansevieria Mini H`,
  },
  {
    image: image2,
    company: `Starbucks`,
    price: `18.05`,
    title: `Perfect Dessert Set`,
  },
  {
    image: image3,
    company: `Emart`,
    price: `84.37`,
    title: `₩100,000 Gift Card`,
  },
  {
    image: image4,
    company: `BHC (Chicken)`,
    price: `21.94`,
    title: `Bburinkle Chicken + Bburinkle Cheese Ball + Coke 1.25L`,
  },
  {
    image: image5,
    company: `Plants (Delivery)`,
    price: `54.84`,
    title: `Sansevieria Mini H`,
  },
  {
    image: image6,
    company: `Starbucks`,
    price: `18.05`,
    title: `Perfect Dessert Set`,
  },
  {
    image: image7,
    company: `Emart`,
    price: `84.37`,
    title: `₩100,000 Gift Card`,
  },
  {
    image: image8,
    company: `BHC (Chicken)`,
    price: `21.94`,
    title: `Bburinkle Chicken + Bburinkle Cheese Ball + Coke 1.25L`,
  },
];

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
        <div key={key} className={classes.card}>
          <div style={{ borderRadius: `16px` }} className={classes.image}>
            <Image
              alt={`image`}
              src={item.imageUrl}
              width={`100%`}
              height={`100%`}
            />
          </div>
          <p className={classes.company}>{item.categories}</p>
          <p className={classes.title}>{item.name}</p>
          <p className={classes.price}>
            US$ {item?.valueDenominations?.split(`,`)?.[0]}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.carousaldiv}>
      <h2>🎁 Most Popular Gifts 🎁</h2>
      {/* <Carousel
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
      </Carousel> */}
    </div>
  );
};

export default PopularGift;
