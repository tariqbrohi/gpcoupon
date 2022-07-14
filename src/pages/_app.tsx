import AppStateProvider from '@/modules/components/AppStateProvider';
import GrowthThemeProvider from '@/modules/components/ThemeProvider';
import { AppContext, AppInitialProps } from 'next/app';
import { parseCookies } from '@/lib/parse-cookies';
import { UserProvider } from '@auth0/nextjs-auth0';

type AppProps = AppInitialProps & {
  cookies: Record<string, string>;
};

function MyApp({ Component, pageProps, cookies }: AppContext & AppProps) {
  return (
    <UserProvider>
      <GrowthThemeProvider>
        <AppStateProvider cookies={cookies}>
          <Component {...pageProps} />
        </AppStateProvider>
      </GrowthThemeProvider>
    </UserProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  const cookies = parseCookies(ctx.req);
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    cookies,
    pageProps,
  };
};

export default MyApp;
