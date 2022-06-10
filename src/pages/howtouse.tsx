import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import send_step1_en from '@/asset/send_step1_en.png';
import send_step2_en from '@/asset/send_step2_en.png';
import send_step3_en from '@/asset/send_step3_en.png';
import send_step4_link_en from '@/asset/send_step4_link_en.png';
import send_step4_mms_en from '@/asset/send_step4_mms_en.png';
import redeem_link_en from '@/asset/redeem_link_en.gif';
import redeem_mms from '@/asset/redeem_mms.png';
import { Typography, Grid } from '@mui/material';
import { useStyles } from '../styles/pages/HowToUse';
import Layout from '@/components/layout/Layout';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Carousel from 'react-multi-carousel';
export default function Home() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 51,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const classes = useStyles();
  const [value, setValue] = useState('1');
  const [value2, setValue2] = useState('first');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleChange2 = (event: React.SyntheticEvent, newValue: string) => {
    setValue2(newValue);
  };
  return (
    <Layout>
      <div className={classes.container}>
        <TabContext value={value}>
          <div className={classes.howTuseTabWrapper}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="How to use" value="1" />
              <Tab label="How to redeem" value="2" />
            </TabList>
          </div>
          <TabPanel value="1">
            <Carousel
              responsive={responsive}
              className={classes.stepCarousel}
              autoPlay={false}
              ssr={true}
            >
              <div
                className={`${classes.stepCarouselItem} ${classes.stepCarouselFirstItem} `}
              >
                <div className={classes.stepCarouselFirstItemImage}>
                  <Image src={send_step1_en} />
                </div>
                <div className={classes.stepCarouselFirstItemDetails}>
                  <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                    step 1
                  </Typography>
                  <Typography variant="h5" style={{ fontWeight: 'bolder' }}>
                    Choose a gift
                  </Typography>
                  <Typography variant="body1">
                    Choose the perfect gift for friends or loved ones.
                  </Typography>
                </div>
              </div>
              <div
                className={`${classes.stepCarouselItem} ${classes.stepCarouselSecondItem} `}
              >
                <div className={classes.stepCarouselSecondItemImage}>
                  <Image src={send_step2_en} />
                </div>
                <div>
                  <div className={classes.stepCarouselSecondItemDetails}>
                    <Typography variant="h6">step 2</Typography>
                    <Typography variant="h5">Select delivery method</Typography>
                    <Typography variant="body1">
                      You can send the gift via link share or text message.
                      Choose your preferred delivery method.
                    </Typography>
                    <Typography variant="body2">
                      * Please note some gifts can only be delivered via text
                      message.
                    </Typography>
                  </div>
                </div>
              </div>
              <div
                className={`${classes.stepCarouselItem} ${classes.stepCarouselThirdItem} `}
              >
                <div className={classes.stepCarouselThirdItemImage}>
                  <Image src={send_step3_en} />
                </div>
                <div>
                  <div className={classes.stepCarouselThirdItemDetails}>
                    <Typography variant="h6">step 3</Typography>
                    <Typography variant="h5">Complete payment</Typography>
                    <Typography variant="body1">
                      We accept credit and debit cards as well as Apple Pay,
                      Google Pay and Alipay.
                    </Typography>
                    <Typography variant="body2">
                      * All prices are in USD. If you are paying with a
                      different currency actual price may vary.
                    </Typography>
                  </div>
                </div>
              </div>
              <div
                className={`${classes.stepCarouselItem} ${classes.stepCarouselFourthItem} `}
              >
                <div className={classes.stepCarouselFourthItemImage}>
                  <Image
                    src={
                      value2 === 'first'
                        ? send_step4_link_en
                        : send_step4_mms_en
                    }
                  />
                </div>
                <div>
                  <div className={classes.stepCarouselFourthItemDetails}>
                    <Typography variant="h6">step 4</Typography>
                    <Typography variant="h5">
                      {value2 === 'first'
                        ? 'Order completed!'
                        : 'Your gift is delivered!'}
                    </Typography>
                    <TabContext value={value2}>
                      <TabList
                        onChange={handleChange2}
                        aria-label="lab API tabs example"
                      >
                        <Tab label="Link share" value="first" />
                        <Tab label="Text message" value="second" />
                      </TabList>
                      <TabPanel value="first">
                        <Typography variant="body1">
                          We accept credit and debit cards as well as Apple Pay,
                          Google Pay and Alipay.
                        </Typography>
                      </TabPanel>
                      <TabPanel value="second">
                        <Typography variant="body1">
                          * All prices are in USD. If you are paying with a
                          different currency actual price may vary.
                        </Typography>
                      </TabPanel>
                    </TabContext>
                  </div>
                </div>
              </div>
            </Carousel>
          </TabPanel>
          <TabPanel value="2">
            <div className={classes.rendomWrapper}>
              <div
                className={`${classes.stepRendomItem} ${classes.stepRemdomFirstItem} `}
              >
                <div className={classes.stepRemdomFirstItemImage}>
                  <Image src={redeem_link_en} />
                </div>
                <div className={classes.stepRemdomFirstItemDetails}>
                  <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                    Received a link?
                  </Typography>
                  <Typography variant="h5" style={{ fontWeight: 'bolder' }}>
                    Click the link and check out the barcode and instructions on
                    how you redeem your gift.
                  </Typography>
                  <Typography variant="body1">
                    * Images are for illustration purposes only and actual
                    product may vary
                  </Typography>
                </div>
              </div>
              <div
                className={`${classes.stepRendomItem} ${classes.stepRemdomSecondItem} `}
              >
                <div className={classes.stepRemdomSecondItemImage}>
                  <Image src={redeem_mms} />
                </div>
                <div className={classes.stepRemdomSecondItemDetails}>
                  <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                    Received a text message?
                  </Typography>
                  <Typography variant="h5" style={{ fontWeight: 'bolder' }}>
                    Open the text message and check out the barcode and
                    instructions on how you redeem your gift.
                  </Typography>
                  <Typography variant="body1">
                    * Images are for illustration purposes only and actual
                    product may vary.
                  </Typography>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabContext>
      </div>
    </Layout>
  );
}
