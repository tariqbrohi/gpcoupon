import React from 'react';
import { Box, Typography } from '@mui/material';
import Spacer from './Spacer';

export default function GCardWrapper({ children, title }: any) {
  return (
    <Box sx={{ px: 1.7 }}>
      <Spacer size={50} />
      <Typography textAlign="center" fontWeight={500} fontSize={21}>
        🎁 {title} 🎁
      </Typography>
      <Spacer size={50} />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        {children}
      </Box>
      <Spacer size={50} />
    </Box>
  );
}
