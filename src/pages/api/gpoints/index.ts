import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { BadRequestError, NotFoundError } from '@/lib/errors';

export default errorHandler(async function handler(req, res) {
  if (req.method !== 'get') {
    throw new NotFoundError();
  }

  const gpoints = await prisma.gPoint.findMany({});

  res.send(gpoints);
});
