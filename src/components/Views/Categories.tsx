import React, { useEffect, useState } from 'react';

import { useStyles } from '../../styles/components/CategoriesStyle';

import SimpleCategoryCard from './SimpleCategoryCard';
import { getCategories } from '@/redux/actions/authActions';
import { Box } from '@mui/material';
import { mapCatToImg } from '@/constants';

const Categories = () => {
  const [Categorydata, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      const resp = await getCategories(`voucher_category`);
      setData(resp);
    })();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2 className={classes.heading}>Categories</h2>
      </div>
      <div className={classes.main}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          {Categorydata?.slice(0, 16)?.map((data: any, index: number) => (
            <SimpleCategoryCard
              key={index}
              data={data}
              img={mapCatToImg[data.filterValueCode]}
            />
          ))}
        </Box>
      </div>
    </div>
  );
};

export default Categories;
