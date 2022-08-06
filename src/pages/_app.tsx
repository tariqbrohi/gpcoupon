import AppStateProvider from '@/modules/components/AppStateProvider';
import GrowthThemeProvider from '@/modules/components/ThemeProvider';
import { AppContext, AppInitialProps } from 'next/app';
import { parseCookies } from '@/lib/parse-cookies';
import { UserProvider } from '@auth0/nextjs-auth0';
import { Paragraph, Spacer } from '@growth-ui/react';

type AppProps = AppInitialProps & {
  cookies: Record<string, string>;
};

function MyApp({ Component, pageProps, cookies }: AppContext & AppProps) {
  return (
    <UserProvider>
      <GrowthThemeProvider>
        <AppStateProvider cookies={cookies}>
          {/* <Component {...pageProps} /> */}
          <div>
            <Spacer size={50} />
            <div style={{}}>
              <img
                src="https://demo.wpbeaveraddons.com/wp-content/uploads/2018/02/main-vector.png"
                alt="maintenance"
                style={{
                  display: 'block',
                  margin: '0 auto',
                }}
              />
            </div>
            <Spacer size={30} />
            <Paragraph fontWeight={600} fontSize={24} textAlign="center">
              Under maintenance
            </Paragraph>
            <Paragraph textAlign="center">
              Coming soon with better features!
            </Paragraph>
          </div>
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
