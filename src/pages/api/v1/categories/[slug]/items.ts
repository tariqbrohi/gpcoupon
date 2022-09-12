import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import xoxoday from '@/pages/api/_lib/xoxoday';
import { NotFoundError } from '@/lib/errors';
import { orderBy as sort } from 'lodash';

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

    const [affiliateCoupons, count] = await Promise.all([
      prisma.item.findMany({
        where: {
          status: 'AVAILABLE',
          affiliate: true,
          categoryIDs: {
            has: category.id,
          },
        },
        orderBy,
        select: {
          id: true,
          name: true,
          slug: true,
          imageUrls: true,
          price: true,
          originalPrice: true,
          discountRate: true,
          customerDiscountRate: true,
          amount: true,
          type: true,
          sortOrder: true,
          termsAndConditionsInstructions: true,
          redemptionInstructions: true,
        },
        take: +take,
        skip: +skip,
      }),
      prisma.item.count({
        where: {
          status: 'AVAILABLE',
          affiliate: true,
          categoryIDs: {
            has: category.id,
          },
        },
      }),
    ]);

    const items = await xoxoday.vouchers.findMany({
      country,
      category: slug,
    });

    if (sortBy === 'amount,asc') {
      items.sort((a, b) => a.price.amount - b.price.amount);
    } else if (sortBy === 'amount,desc') {
      items.sort((a, b) => b.price.amount - a.price.amount);
    }

    // todo
    // temp
    // fix in better way
    category.total = items.length + count;

    category.items = sort(
      items.slice(+skip, +skip + +take).concat(affiliateCoupons as any),
      ['sortOrder'],
      ['desc'],
    );

    res.send(category);
  }
});
