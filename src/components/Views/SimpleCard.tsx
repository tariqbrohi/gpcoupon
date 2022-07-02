import { Box, Typography } from '@mui/material';
import Router from 'next/router';
import React from 'react';
import Spacer from '../Spacer';

export default function SimpleCard({
  amount,
  name,
  imageUrl,
  extendedName,
  id,
  slug,
}: any) {
  return (
    <Box
      sx={{
        maxWidth: '300px',
        padding: '20px',
        transition: 'all 100ms linear',
        cursor: 'pointer',
        borderRadius: '10px',
        '&:hover': {
          background: 'rgba(0,0,0,0.05)',
        },
      }}
      onClick={() => Router.push(`/gift/${slug}`)}
    >
      <img
        src={imageUrl}
        style={{ width: '100%', height: '195px', borderRadius: '10px' }}
      />
      <Spacer size={10} />
      <Typography fontWeight={600} fontSize={18}>
        {name}
      </Typography>
      <Typography fontWeight={600} color="gray">
        {extendedName}
      </Typography>
      <Typography fontWeight={700} fontSize={20}>
        G{amount.toFixed(2)}
      </Typography>
    </Box>
  );
}
