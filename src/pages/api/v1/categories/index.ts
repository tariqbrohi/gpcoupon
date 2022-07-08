import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { NotFoundError } from '@/lib/errors';

export default errorHandler(async function handler(req, res) {
  const method = req.method;

  if (method !== 'get') {
    throw new NotFoundError();
  }

  const categories = await prisma.category.findMany({});

  res.send(categories);
});
