import errorHandler from '@/pages/api/_middlewares/error-handler';
import { NotFoundError } from '@/lib/errors';
import prisma from '@/prisma';

export default errorHandler(async function handler(req, res) {
  const method = req.method;

  if (method !== 'get') {
    throw new NotFoundError();
  }

  const { slug } = req.query as any;

  const item = await prisma.item.findFirst({
    where: {
      slug,
    },
  });

  res.send(item);
});
