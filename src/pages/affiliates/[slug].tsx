import Layout from '@/components/layout/Layout';
import SimpleCard from '@/components/Views/SimpleCard';
import AppContext from '@/providers/app-context';
import { Box, Container, Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

export default function Affiliate() {
  const {
    query: { slug },
  } = useRouter();
  const { country } = useContext(AppContext);
  const [{ data = [] }] = useAxios({
    method: 'get',
    url: `/api/brands/${slug}/items?country=${country}`,
  });
  console.log(data);

  return (
    <Layout>
      <Container sx={{ my: 8 }}>
        <Typography fontWeight={600} fontSize={20}>
          Results {data?.length}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {data?.map((d: any) => (
            <SimpleCard key={d.id} {...d} />
          ))}
        </Box>
      </Container>
    </Layout>
  );
}
