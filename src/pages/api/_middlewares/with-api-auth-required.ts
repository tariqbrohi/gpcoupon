import { CustomError, UnauthenticatedError } from '@/lib/errors';
import { parseCookies } from '@/lib/parse-cookies';
import jwtDecode from 'jwt-decode';
import { NextApiRequest, NextApiResponse } from 'next';

const withApiAuthRequired = (
  apiHandler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('not even here');
    try {
      const { jid } = parseCookies(req);

      const { exp } = jwtDecode(jid) as any;

      if (new Date().valueOf() >= exp * 1000) {
        throw new UnauthenticatedError();
      }

      await apiHandler(req, res);
    } catch (err: any) {
      throw new UnauthenticatedError();
    }
  };
};

export default withApiAuthRequired;
