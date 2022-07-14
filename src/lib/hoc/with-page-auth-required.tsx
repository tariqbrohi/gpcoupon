import redirect from '../redirect';
import useUser from '@/auth/useUser';
import { NextPageContext } from 'next';
import { parseCookies } from '../parse-cookies';
import { ROUTES } from '@/ROUTES';
import { useEffect } from 'react';

const withPageAuthRequired =
  (roles: string[]) =>
  (PageComponent: any, returnTo = ROUTES.login) => {
    const WithPageAuthRequired = (props: any) => {
      const user = useUser();

      useEffect(() => {
        if (user) return;

        redirect(null, returnTo);
      }, [user]);

      return <PageComponent {...props} />;
    };

    WithPageAuthRequired.getInitialProps = async (ctx: NextPageContext) => {
      const { req, res } = ctx;

      let pageProps: Record<string, any> = {};

      if (req && res) {
        const { sess } = parseCookies(req);

        if (!sess) {
          return redirect(res, returnTo);
        }
      }

      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      return pageProps;
    };

    return WithPageAuthRequired;
  };

export default withPageAuthRequired;
