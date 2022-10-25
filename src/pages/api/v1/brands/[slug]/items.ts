import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import xoxoday from '@/pages/api/_lib/xoxoday';

export default errorHandler(async function handler(req, res) {
  const method = req.method;

  if (method !== 'get') {
    throw new NotFoundError();
  }

  const {
    country,
    slug,
    take = 20,
    skip = 0,
    sortBy = 'sales,desc',
  } = req.query as any;

  if (!slug || !country) throw new BadRequestError('');

  let orderBy: Record<string, string> = {};

  if (sortBy === 'sales,desc') {
    orderBy.sortOrder = 'desc';
  } else if (sortBy === 'amount,desc') {
    orderBy.amount = 'desc';
  } else {
    orderBy.amount = 'asc';
  }
  // console.log(req.query);
  const brand = (await prisma.brand.findFirst({
    where: {
      slug,
      status: 'AVAILABLE',
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      backgroundUrl: true,
      thumbnailUrl: true,
    },
  })) as Record<string, any>;

  const items = await xoxoday.vouchers.findMany({
    country,
    brand: slug,
  });
  // console.log(items.length);
  if (sortBy === 'amount,asc') {
    items.sort((a, b) => a.price.amount - b.price.amount);
  } else if (sortBy === 'amount,desc') {
    items.sort((a, b) => b.price.amount - a.price.amount);
  }

  brand.total = items.length;
  brand.items = items.slice(+skip, +skip + +take);

  res.send(brand);
});
