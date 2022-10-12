import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { NotFoundError } from '@/lib/errors';

export default errorHandler(async function handler(req, res) {
  const method = req.method;

  if (method !== 'get') {
    throw new NotFoundError();
  }

  const {
    affiliate = 'false',
    country,
    status = 'AVAILABLE',
  } = req.query as any;

  let where: Record<string, any> = {
    status,
    ...(affiliate === 'true' ? { affiliate: true } : { affiliate: false }),
  };

  if (status === 'ALL') {
    delete where.status;
  }

  if (country) {
    where.countries = {
      has: country,
    };
  }

  const brands = await prisma.brand.findMany({
    where,
  });

  res.send(brands);
});
