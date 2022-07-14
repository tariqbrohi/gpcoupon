import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { NotFoundError } from '@/lib/errors';

export default errorHandler(async function handler(req, res) {
  const method = req.method;

  if (method !== 'get') {
    throw new NotFoundError();
  }

  const { slug } = req.query as any;

  const brand = await prisma.brand.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      terms: true,
      disclaimer: true,
      status: true,
      thumbnailUrl: true,
      backgroundUrl: true,
      description: true,
      countries: true,
      categoryIDs: true,
    },
  });

  res.send(brand);
});
