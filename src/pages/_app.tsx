import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { lightTheme } from '../theme';
import '../styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Object.keys(lightTheme).forEach((key) => {
      document.body.style.setProperty(`--${key}`, lightTheme[key]);
    });
  }, []);

  return <Component {...pageProps} />;
}
