import moment from 'moment';
import redirect from '../redirect';
import { getSession, useUser } from '@auth0/nextjs-auth0';
import { NextPageContext } from 'next';
import { ROUTES } from '@/ROUTES';
import { useEffect } from 'react';

const withPageAuthRequired =
  (roles: string[]) =>
  (PageComponent: any, returnTo = ROUTES.login) => {
    const WithPageAuthRequired = (props: any) => {
      const { user, error, isLoading } = useUser();

      useEffect(() => {
        if ((user && !error) || isLoading) return;

        redirect(null, returnTo);
      }, [user, error, isLoading]);

      return <PageComponent {...props} />;
    };

    WithPageAuthRequired.getInitialProps = async (ctx: NextPageContext) => {
      const { req, res } = ctx;

      let pageProps: Record<string, any> = {};

      if (req && res) {
        const { user, accessTokenExpiresAt = 0 } = getSession(req, res) || {};

        if (!user || accessTokenExpiresAt <= moment().unix()) {
          redirect(res, returnTo);
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
