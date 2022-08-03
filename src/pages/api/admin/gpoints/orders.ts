import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import moment from 'moment';

export default withApiAuthRequired(
  errorHandler(async function handler(req, res) {
    if (req.method !== 'get') {
      throw new NotFoundError();
    }

    const orders = await prisma.gPointOrder.findMany({
      where: {
        status: 'PENDING',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.send(orders);
  }),
);
