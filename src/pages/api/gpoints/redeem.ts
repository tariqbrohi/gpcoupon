import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { BadRequestError, ForbiddenError, NotFoundError } from '@/lib/errors';
import moment from 'moment';

export default errorHandler(async function handler(req, res) {
  if (req.method !== 'post') {
    throw new NotFoundError();
  }
  const { id, code, pin, t } = req.body;

  if (t !== 'thisisfortemporaryshit') {
    throw new ForbiddenError('Invalid request');
  }

  const gpoint = await prisma.gPointGift.findUnique({
    where: {
      id,
    },
  });

  if (!gpoint || gpoint.code !== code || gpoint.pin !== pin) {
    throw new BadRequestError('Invalid code or pin');
  }

  if (gpoint.status.toLowerCase() !== 'available') {
    console.log('for sure');
    throw new BadRequestError('This coupon is already used');
  }

  const gift = await prisma.gPointGift.update({
    where: {
      id,
    },
    data: {
      status: 'used',
      updatedAt: moment().unix(),
    },
  });

  res.send(gift);
});
