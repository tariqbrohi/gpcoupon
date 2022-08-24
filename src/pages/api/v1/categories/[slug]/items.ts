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

    let orderBy: Record<string, any> = {};

    if (sortBy === 'amount,asc') {
      orderBy.price = {};
      orderBy.price.amount = 'asc';
    } else if (sortBy === 'amount,desc') {
      orderBy.price = {};
      orderBy.price.amount = 'desc';
    } else {
      orderBy.sortOrder = 'desc';
    }

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
        originalPrice: true,
        discountRate: true,
        customerDiscountRate: true,
        price: true,
        slug: true,
      },
    };

    const items = await xoxoday.vouchers.findMany({
      country,
      category: slug,
    });

    category.items = items;

    res.send(category);
  }
});
