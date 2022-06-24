import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { lightTheme } from '../theme';
import { ThemeProvider } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../theme';
import AppContext from '../providers/app-context';
import '../styles/global.css';
import 'react-multi-carousel/lib/styles.css';
import { UserProvider } from '@auth0/nextjs-auth0';
import { useLocalStorage } from '@/providers/useLocalStorage';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Object.keys(lightTheme).forEach((key) => {
      document.body.style.setProperty(`--${key}`, lightTheme[key]);
    });
  }, []);

  const [user, setUser] = useLocalStorage(`userId`, ``);
  const [userDetail, setUserDetail] = useLocalStorage(`userDetail`, ``);
  const [country, setCountry] = useLocalStorage(`country`, `usa`);
  const [singleVoucher, setSingleVoucher] = useLocalStorage(
    `singleVoucher`,
    ``,
  );
  const [name, setName] = useLocalStorage(`name`, ``);

  // const [user, setUser] = useState('isAuthenticated');
  // const [country, setCountry] = useState('country');
  // const [singleVoucher, setSingleVoucher] = useState('singleVoucher');
  // const [name, setName] = useState('name');

  // console.log('country App', country)
  const handleSetUserDetail = (detail: Record<string, any>) => {
    setUserDetail(JSON.stringify(detail));
  };

  return (
    <AppContext.Provider
      value={{
        singleVoucher,
        // userDetail: JSON.parse(userDetail || `{}`),
        setUserDetail: handleSetUserDetail,
        setSingleVoucher,
        name,
        setName,
        user,
        setUser,
        country,
        setCountry,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          {/* <Component {...pageProps} /> */}
          <Component {...pageProps} />
        </UserProvider>
      </ThemeProvider>
    </AppContext.Provider>
  );
}
