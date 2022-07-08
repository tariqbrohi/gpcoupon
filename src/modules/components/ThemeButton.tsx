import React from 'react';
import { Button, ButtonProps } from '@growth-ui/react';
import { color } from '../brandingTheme';

export default function ThemeButton({ children, style, ...rest }: ButtonProps) {
  return (
    <Button
      {...rest}
      style={{
        color: '#fff',
        background: color['themeBg-700'],
        ...style,
      }}
    >
      {children}
    </Button>
  );
}
