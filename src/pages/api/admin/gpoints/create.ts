import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import moment from 'moment';

export default withApiAuthRequired(
  errorHandler(async function handler(req, res) {
    // console.log('HERE ', req.method);
    if (req.method !== 'post') {
      throw new NotFoundError();
    }

    const timestamp = moment().unix();

    const gpoint = await prisma.gPoint.create({
      data: {
        ...req.body,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    });

    res.status(201).send(gpoint);
  }),
);
