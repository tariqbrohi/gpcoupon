import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import moment from 'moment';

export default withApiAuthRequired(
  errorHandler(async function handler(req, res) {
    if (req.method !== 'delete' && req.method !== 'get') {
      throw new NotFoundError();
    }

    const { id } = req.query as any;

    if (req.method === 'delete') {
      await prisma.gPoint.delete({
        where: {
          id,
        },
      });

      res.send(true);
    }
  }),
);
