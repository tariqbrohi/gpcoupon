import { CustomError } from '@/lib/errors';
import { NextApiRequest, NextApiResponse } from 'next';

export default (
  apiHandler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const method = req.method?.toLowerCase();

      req.method = method;

      await apiHandler(req, res);
    } catch (err: any) {
      if (err instanceof CustomError) {
        return res
          .status(err.statusCode)
          .send({ errors: err.serializeErrors() });
      }

      console.error('Cached unknown error - ', err);

      res.status(500).send({
        errors: [
          {
            message: 'Internal Server Error',
          },
        ],
      });
    }
  };
};
