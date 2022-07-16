import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import xoxoday from '@/pages/api/_lib/xoxoday';
import { NotFoundError } from '@/lib/errors';
import { flatten } from 'lodash';

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

  if (country && slug) {
    const category = (await prisma.category.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        imageUrls: true,
      },
    })) as Record<string, any>;

    let orderBy: Record<string, string> = {};

    if (sortBy === 'sales,desc') {
      orderBy.sortOrder = 'desc';
    } else if (sortBy === 'amount,desc') {
      orderBy.amount = 'desc';
    } else {
      orderBy.amount = 'asc';
    }

    // todo
    // save every countries
    let items;

    const params = {
      take,
      skip,
      where: {
        country: country?.toUpperCase() || 'US',
        status: 'AVAILABLE',
        categories: {
          some: {
            id: category?.id,
          },
        },
      },
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
    } as Record<string, any>;

    if (slug === 'under-10') {
      params.where.amount = {
        lte: 10,
      };
    }

    if (country?.toLowerCase() !== 'us') {
      items = await xoxoday.vouchers.findMany({
        country,
        category: slug,
      });

      const dbItems = await prisma.item.findMany(params as any);

      items = flatten([items, dbItems]);
    }
    // todo
    // check with xoxoday for any updates in data.
    else {
      items = await prisma.item.findMany(params as any);
    }

    category.items = items;

    res.send(category);
  }
});
