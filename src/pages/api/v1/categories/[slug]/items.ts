import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import xoxoday from '@/pages/api/_lib/xoxoday';
import { NotFoundError } from '@/lib/errors';

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

    if (country !== 'US' || country !== 'us') {
      items = await xoxoday.vouchers.findMany({
        country,
        category: slug,
      });
    }
    // todo
    // check with xoxoday for any updates in data.
    else {
      items = await prisma.item.findMany({
        take,
        skip,
        where: {
          country,
          categories: {
            some: {
              id: category?.id,
            },
          },
        },
        orderBy,
        select: {
          amount: true,
          name: true,
          extendedName: true,
          imageUrls: true,
          discountRate: true,
          currency: true,
          slug: true,
        },
      });
    }

    category.items = items;

    res.send(category);
  }
});
