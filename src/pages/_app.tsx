import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { lightTheme } from '../theme';
import { ThemeProvider } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../theme';
import '../styles/global.css';
import 'react-multi-carousel/lib/styles.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Object.keys(lightTheme).forEach((key) => {
      document.body.style.setProperty(`--${key}`, lightTheme[key]);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
