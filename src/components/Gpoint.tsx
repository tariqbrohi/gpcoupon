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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const { country } = useContext(AppContext);
  const [{ data: forexData }] = useAxios({
    method: 'post',
    url: '/api/forex',
  });

  useEffect(() => {
    axios
      .get(`/api/brands/gpoint/items?country=${country}`)
      .then(({ data }) => setData(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <GCardWrapper title="GPoints Coupon">
      {data?.map((item: any) => (
        <Card
          key={item.id}
          sx={{ display: 'flex', mx: 1.5, cursor: 'pointer' }}
          onClick={() => Router.push(`/coupon/${item.slug}`)}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {item.name}
              </Typography>
              <Typography component="div" variant="h5">
                {convert(item.amount, forexData, 1)}
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={item.imageUrl}
          />
        </Card>
      ))}
    </GCardWrapper>
  );
}
