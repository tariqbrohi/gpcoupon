import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import moment from 'moment';

export default withApiAuthRequired(
  errorHandler(async function handler(req, res) {
    console.log('HERE ', req.method);
    if (req.method !== 'get') {
      throw new NotFoundError();
    }

    const gpoints = await prisma.gPoint.findMany({});

    res.send(gpoints);
  }),
);
