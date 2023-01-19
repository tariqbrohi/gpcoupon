import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import gpointwallet from '@/pages/api/_lib/gpointwallet';

export default errorHandler(async function handler(req, res) {
  if (req.method !== 'put') {
    throw new NotFoundError();
  }

  const session = gpointwallet.getSession(req);
  if (!session) throw new BadRequestError('No User');

  const { id, status } = req.body;

  const timestamp = new Date().valueOf();

  const updateItemStatus = await prisma.item.update({
    where: {
      id,
    },
    data: {
      status,
      updatedAt: timestamp,
    },
  });

  res.send(updateItemStatus);
});
