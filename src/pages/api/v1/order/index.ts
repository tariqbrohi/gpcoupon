import errorHandler from '@/pages/api/_middlewares/error-handler';
import xoxoday from '@/pages/api/_lib/xoxoday';
import { NotFoundError } from '@/lib/errors';
import prisma from '@/prisma';

export default errorHandler(async function handler(req, res) {
  if (req.method !== 'post' && req.method !== 'get') {
    throw new NotFoundError();
  }

  // prisma.order.create({
  //   data: {

  //   }
  // })
});
