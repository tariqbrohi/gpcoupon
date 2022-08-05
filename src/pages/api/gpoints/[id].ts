import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { BadRequestError, NotFoundError } from '@/lib/errors';

export default errorHandler(async function handler(req, res) {
  if (req.method !== 'get') {
    throw new NotFoundError();
  }

  const { id } = req.query as any;

  const gpoint = await prisma.gPoint.findUnique({
    where: {
      id,
    },
  });

  res.send(gpoint);
});
