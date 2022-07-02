import AppStateProvider from '@/modules/components/AppStateProvider';
import Context from '../providers/app-context';
import CssBaseline from '@mui/material/CssBaseline';
import GrowthThemeProvider from '@/modules/components/ThemeProvider';
import { AppContext, AppInitialProps } from 'next/app';
import { lightTheme } from '../theme';
import { parseCookies } from '@/lib/parse-cookies';
import { theme } from '../theme';
import { ThemeProvider } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '@/providers/useLocalStorage';
import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/global.css';
import TempContext from '../providers/app-context';
import 'react-multi-carousel/lib/styles.css';

type AppProps = AppInitialProps & {
  cookies: Record<string, string>;
};

function MyApp({ Component, pageProps, cookies }: AppContext & AppProps) {
  useEffect(() => {
    Object.keys(lightTheme).forEach((key) => {
      document.body.style.setProperty(`--${key}`, lightTheme[key]);
    });
  }, []);

  const [user, setUser] = useLocalStorage(`userId`, ``);
  const [userDetail, setUserDetail] = useLocalStorage(`userDetail`, `{}`);
  const [country, setCountry] = useLocalStorage(`country`, `usa`);
  const [singleVoucher, setSingleVoucher] = useLocalStorage(
    `singleVoucher`,
    ``,
  );
  const [name, setName] = useLocalStorage(`name`, ``);

  const handleSetUserDetail = (detail: Record<string, any>) => {
    setUserDetail(JSON.stringify(detail));
  };

  return (
    <Context.Provider
      value={{
        singleVoucher,
        userDetail: (() => {
          try {
            return JSON.parse(userDetail || `{}`);
          } catch {
            return {};
          }
        })(),
        setUserDetail: handleSetUserDetail,
        setSingleVoucher,
        name,
        setName,
        user,
        setUser,
        country,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <GrowthThemeProvider>
            {/* <Component {...pageProps} /> */}
            <AppStateProvider cookies={cookies}>
              <Component {...pageProps} />
            </AppStateProvider>
          </GrowthThemeProvider>
        </UserProvider>
      </ThemeProvider>
    </Context.Provider>
  );
}

MyApp.getInitialProps = async ({ ctx: { req } }: AppContext) => {
  const cookies = parseCookies(req);

  return {
    cookies,
  };
};

export default MyApp;
