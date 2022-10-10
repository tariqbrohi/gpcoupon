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
    take = 500,
    skip = 0,
    sortBy = 'createdAt,desc',
    sub
  } = req.query as any;

  if (!sub || !country) throw new BadRequestError('');

  let orderBy: Record<string, string> = {};

  if (sortBy === 'sales,desc') {
    orderBy.sortOrder = 'desc';
  } else if (sortBy === 'amount,desc') {
    orderBy.amount = 'desc';
  } else if (sortBy === 'amount,asc') { 
    orderBy.amount = 'asc';
  } else if (sortBy === 'createdAt,desc') {
    orderBy.createdAt = 'desc';
  } else {
    orderBy.createdAt = 'asc';
  }

  const brand = (await prisma.brand.findFirst({
    take,
    skip,
    orderBy,
    where: {
      sub,
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

  const items = await prisma.item.findMany({
    take,
    skip,
    orderBy,
    where: {
      brand: brand.id,
    },
    select: {
      id: true,
      affiliate: true,
      name: true,
      slug: true,
      status: true,
      couponImageUrl: true,
      expiresIn: true,
      originalPrice: true,
      amount: true,
      price: true,
      createdAt: true,
      brand: true,
      country: true,
      categories: true
    },
  });

  const total = await prisma.item.aggregate({
    where: {
      brand: brand.id,
    },
    _count: true,
  });

  brand.items = items;
  brand.total = total._count;

  res.send(brand);
});
