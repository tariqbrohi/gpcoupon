import { ForbiddenError } from '@/lib/errors';
import { parseCookies } from '@/lib/parse-cookies';
import jwtDecode from 'jwt-decode';
import { NextApiRequest, NextApiResponse } from 'next';

const secret =
  process.env.NODE_ENV === 'production' ? process.env.GW_AUTH_SECRET : 'secret';

const auth = (
  apiHandler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split('Bearer ').pop();

    if (token !== secret) {
      throw new ForbiddenError();
    }

    await apiHandler(req, res);
  };
};

export default auth;
