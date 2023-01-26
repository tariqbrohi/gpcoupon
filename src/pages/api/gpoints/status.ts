import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { BadRequestError, NotFoundError } from '@/lib/errors';

export default errorHandler(async function handler(req, res) {
  if (req.method !== 'post') {
    throw new NotFoundError();
  }

  const { code, pin } = req.body;

  const gpoint = await prisma.gPointGift.findUnique({
    where: {
      code_pin: {
        code,
        pin,
      },
    },
  });
  console.log(gpoint, ' /?? ?? ??  ');
  if (!gpoint) {
    throw new BadRequestError('Invalid code or pin');
  }

  res.send(gpoint);
});
