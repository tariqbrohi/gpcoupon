import React from 'react';
import Grid from '@mui/material/Grid';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Layout from '@/components/layout/Layout';
import { useStyles } from '../../styles/pages/itemStyle';
import BreadCrumbs from '@/components/Views/BreadCrumbs';
import GGiftDetails from '@/components/Views/GGiftDetails';

import ProductImage from '../../asset/popular2.jpg';
import ReedamImage from '../../asset/reedam.png';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

let Data = [
  {
    para: '- Must be used before the expiration and will not be valid for use once expired.',
  },
  {
    para: '- Images are for illustration purposes only and actual product may vary.',
  },
  {
    para: '- Product availability may differ by locations and in the case the exact menu is unavailable, another menu of equal or higher value may be ordered. (Price difference must be paid on site and is not the responsibility of SodaGift.)',
  },
  {
    para: '※ Not redeemable at: Yongsan 8th United States Army, Yongsan Townhouse, Osan Air Base, Pyeongtaek Humphrey, Pyeongtaek Humphrey Troop Mall, Pyeongtaek Humphrey Main Mall Store, Daegu Camp Walker, Gunsan Air Base, Camp Carroll, Camp Casey, Ocean World Branch Ocean World Entrance, Seorak Waterpia and other specialty locations',
  },
];
let Data2 = [
  {
    para: '[Expiration Date Policy]',
  },
  {
    para: '1. You can only extend the expiration date of valid gift cards up to the day before expiration.',
  },
  {
    para: '2. Expiration date can be extended on a 93 days basis, but it cannot exceed 5 years from the date of initial issuance.',
  },
  {
    para: '3. To extend expiration date of a valid gift card, contact inumber customer support at (1644-5093). Customer service hours are from Monday through Friday (9 AM to 6 PM KST).',
  },
  {
    para: '[Cancel and Refund Policy]',
  },
  {
    para: '1.Before initial expiration: Redeemed gift cards cannot be cancelled or refunded. Unused valid gift cards can be cancelled and refunded to purchasers by contacting SodaGift customer support at (support@sodagift.com).',
  },
  {
    para: '2.Expired gift cards: Unused expired gift cards can be refunded for 90% of the gift card amount. Contact inumber customer support at (1644-5093). Customer service hours are from Monday through Friday (9 AM to 6 PM KST).',
  },
  {
    para: '3.Refunds for expired gift cards cannot exceed 5 years from the date of initial issuance.',
  },
];

const Item = () => {
  const {
    query: { slug },
  } = useRouter();
  const { lang } = useTranslation();
  const classes = useStyles();
  const [tab, setTab] = React.useState('desc');
  const [{ data }] = useAxios(`/api/items/${slug}?country=${lang}`);
  console.log(data);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Layout>
      <div className={classes.container}>
        <div className={classes.main}>
          {/* <BreadCrumbs /> */}
          <Grid container spacing={2} columns={12} className={classes.sec1}>
            <Grid item xs={6}>
              <div className={classes.imageDiv}>
                <img
                  src={data?.imageUrl}
                  style={{ width: '100%', borderRadius: '20px' }}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              {data && <GGiftDetails {...data} />}
            </Grid>
          </Grid>
          <Box
            sx={{ width: '100%', fontWeight: 'bold' }}
            className={classes.box}
          >
            <TabContext value={tab}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  marginTop: '3rem',
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label="Description"
                    value="desc"
                    className={
                      tab === 'desc' ? classes.tabHead : classes.tabHeadUnactive
                    }
                  />
                  <Tab
                    label="Refund & Policies"
                    value="refund"
                    className={
                      tab === 'refund'
                        ? classes.tabHead
                        : classes.tabHeadUnactive
                    }
                  />
                </TabList>
              </Box>
              <TabPanel value="desc">
                {Data?.map((para, idx) => (
                  <p className={classes.desc} key={idx}>
                    {para.para}
                  </p>
                ))}
                {/* <div className={classes.descImage}>
                  <Image src={ReedamImage} />
                </div> */}
              </TabPanel>
              <TabPanel value="refund">
                {Data2?.map((para, idx) => (
                  <p className={classes.desc} key={idx}>
                    {para.para}
                  </p>
                ))}
                {/* <div className={classes.descImage}>
                  <Image src={ReedamImage} />
                </div> */}
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </Layout>
  );
};

export default Item;
