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
    category.items = items.slice(+skip, +skip + +take);

    res.send(category);
  }
});
