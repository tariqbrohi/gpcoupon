import React, { ReactNode } from 'react';
import { GrowthStyle } from '@growth-ui/react';
import { color, size } from '@/modules/brandingTheme';

const globalStyle = `
`;

const theme = {
  color,
  size,
};

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <GrowthStyle globalStyle={globalStyle} theme={theme}>
      {children}
    </GrowthStyle>
  );
}
