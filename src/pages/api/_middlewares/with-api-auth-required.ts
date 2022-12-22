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
      console.log('called');
      await apiHandler(req, res);
    } catch (err: any) {
      console.log('called dsd ad a');
      console.log(err);
      throw new UnauthenticatedError();
    }
  };
};

export default withApiAuthRequired;
