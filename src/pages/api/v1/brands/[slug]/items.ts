import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { BadRequestError, NotFoundError } from '@/lib/errors';

export default errorHandler(async function handler(req, res) {
  const method = req.method;

  if (method !== 'get') {
    throw new NotFoundError();
  }

  const {
    country,
    slug,
    take = 500,
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

  const brand = (await prisma.brand.findUnique({
    where: {
      slug,
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
    where: {
      country: country?.toUpperCase() || 'US',
      status: 'AVAILABLE',
      brand: {
        id: brand?.id,
      },
    },
    take,
    skip,
    orderBy,
    select: {
      id: true,
      amount: true,
      name: true,
      extendedName: true,
      imageUrls: true,
      discountRate: true,
      currency: true,
      slug: true,
    },
  });

  brand.items = items;

  res.send(brand);
});
