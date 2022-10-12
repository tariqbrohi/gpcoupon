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

  const itemsXoxo = await xoxoday.vouchers.findMany({
    country,
    brand: slug,
  });
  
  if (sortBy === 'amount,asc') {
    itemsXoxo.sort((a, b) => a.price.amount - b.price.amount);
  } else if (sortBy === 'amount,desc') {
    itemsXoxo.sort((a, b) => b.price.amount - a.price.amount);
  }

  brand.total = itemsXoxo.length;
  brand.items = itemsXoxo.slice(+skip, +skip + +take);

  const itemsAff = await prisma.item.findMany({
    take,
    skip,
    orderBy,
    where: {
      brandId: brand.id,
    },
  });

  const total = await prisma.item.aggregate({
    where: {
      brandId: brand.id,
    },
    _count: true,
  });

  brand.items = itemsAff;
  brand.total = total._count;

  res.send(brand);
});
