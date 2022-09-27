import { ForbiddenError } from '@/lib/errors';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Check if the request is authorized or not by checking the header token
 */

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  apiHandler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    console.log(
      token,
      ' not coming ?? ?? ? ? ',
      req.headers.authorization,
      ' and ',
      process.env.GW_SECRET,
    );
    if (!token) {
      throw new ForbiddenError();
    }

    if (token !== process.env.GW_SECRET || 'secret') {
      throw new ForbiddenError();
    }

    await apiHandler(req, res);
  };
};
