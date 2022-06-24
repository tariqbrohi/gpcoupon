import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

import Layout from '@/components/layout/Layout';
import { useStyles } from '../../styles/pages/CategoriesStyle';
import SimpleCategoryCard from '@/components/Views/SimpleCategoryCard';

import BrandCard from '@/components/Views/BrandCard';
import bi1 from '../../asset/bi1.jpg';
import bi2 from '../../asset/bi2.jpg';
import bi3 from '../../asset/bi3.png';
import bi4 from '../../asset/bi4.png';
import bi5 from '../../asset/bi5.jpg';
import bi6 from '../../asset/bi6.jpg';

import brand1 from '../../asset/brand1.jpg';
import brand2 from '../../asset/brand2.jpg';
import brand3 from '../../asset/brand3.jpg';
import brand4 from '../../asset/brand4.jpg';
import brand5 from '../../asset/brand5.jpg';
import brand6 from '../../asset/brand6.jpg';
import { getCategories } from '@/redux/actions/authActions';
import { Box } from '@mui/material';
import { mapCatToImg } from '@/constants';

const BrandData = [
  {
    logo: brand1,
    name: `Shinsegae`,
    banner: bi1,
  },
  {
    logo: brand2,
    name: `Lotte`,
    banner: bi2,
  },
  {
    logo: brand3,
    name: `Hyundai`,
    banner: bi3,
  },
  {
    logo: brand4,
    name: `Galleria`,
    banner: bi4,
  },
  {
    logo: brand5,
    name: `Lotte Mart`,
    banner: bi5,
  },
  {
    logo: brand6,
    name: `EMart`,
    banner: bi6,
  },
  {
    logo: brand1,
    name: `Shinsegae`,
    banner: bi1,
  },
  {
    logo: brand2,
    name: `Lotte`,
    banner: bi2,
  },
];

const Categories = () => {
  const classes = useStyles();
  const [Categorydata, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const resp = await getCategories(`voucher_category`);
      setData(resp);
      console.log(resp);
    })();
  }, []);

  return (
    <Layout>
      <div className={classes.container}>
        <div className={classes.main}>
          <h2 className={classes.heading}>Categories</h2>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <Grid container columns={12}>
              {Categorydata?.map((data: any, index: number) => (
                <Grid key={index} item xs={12} sm={4} md={3} lg={2}>
                  <SimpleCategoryCard
                    data={data}
                    img={mapCatToImg[data.filterValueCode]}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* <h2 className={classes.heading}>Popular Brands</h2>
          <Grid container spacing={2} columns={12} className={classes.grid2}>
            {BrandData?.map((data: any, index: number) => (
              <Grid key={index} item xs={12} sm={4} md={3} lg={3}>
                <BrandCard data={data} />
              </Grid>
            ))}
          </Grid> */}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
