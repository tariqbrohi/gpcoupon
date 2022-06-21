import { Avatar, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import Spacer from '../Spacer';

const SimpleAffiliateCard = ({ data }: any) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        maxWidth: '300px',
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 100ms ease-in-out',
        borderRadius: '10px',
        '&:hover': {
          background: 'rgba(0,0,0,0.05)',
        },
      }}
      onClick={() => router.push(`/affiliates/${data.slug}`)}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={data.logo} />
        <Spacer size={10} />
        <Typography fontWeight={600}>{data.name}</Typography>
      </Box>
      <Spacer size={10} />
      <img
        src={data.descriptiveImage}
        alt={`image`}
        style={{
          borderRadius: 10,
          width: '100%',
        }}
      />
      <Spacer size={10} />
      <Typography color="gray">{data.description}</Typography>
    </Box>
  );
};

export default SimpleAffiliateCard;
