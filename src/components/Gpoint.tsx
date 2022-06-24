import useAxios from 'axios-hooks';
import React, { useContext, useEffect, useState } from 'react';
import Router from 'next/router';
import { ROUTES } from '../ROUTES';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import GCardWrapper from './GCardWrapper';
import convert from '@/lib/forex';
import AppContext from '@/providers/app-context';

export default function GPoints() {
  const { country } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [{ data: forexData }] = useAxios({
    method: 'post',
    url: '/api/forex',
  });

  useEffect(() => {
    axios
      .get(`/api/brands/gpoint/items?country=${country}`)
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading || country !== 'south_korea') return <></>;
  console.log(data, country, loading, forexData);
  return (
    <GCardWrapper title="GPoints Coupon">
      {data?.map((item: any) => (
        <Card
          key={item?.id}
          sx={{ display: 'flex', m: 1.5, cursor: 'pointer' }}
          onClick={() => Router.push(`/coupon/${item?.slug}`)}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ width: '155px' }}>
              <Typography component="div" variant="h5">
                {item?.name}
              </Typography>
              <Typography component="div" variant="h5">
                {convert(item?.amount, forexData || 1, 1)}
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: '200px' }}
            image={item?.imageUrl}
          />
        </Card>
      ))}
    </GCardWrapper>
  );
}
