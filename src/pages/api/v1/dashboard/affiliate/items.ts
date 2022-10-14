import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { BadRequestError, NotFoundError } from '@/lib/errors';

export default errorHandler(async function handler(req, res) {
  const method = req.method;

  if (method !== 'get') {
    throw new NotFoundError();
  }

  const {
    sortBy,
    sub
  } = req.query as any;

  let {
    take = 500,
    skip = 0,
  } = req.query as any;

  if (typeof take !== 'number') take = Number(take);
  if (typeof skip !== 'number') skip = Number(skip);

  if (!sub ) throw new BadRequestError('No BusinessAccount Exists');

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
    where: {
      sub,
    },
    select: {
      id: true,
    },
  })); 

  if (!brand) throw new BadRequestError('No affiliate exists!');

  const items = await prisma.item.findMany({
    take,
    skip,
    orderBy,
    where: {
      brandId: brand.id,
    },
    select: {
      id: true,
      affiliate: true,
      name: true,
      status: true,
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

  const totalItem = await prisma.item.findMany({
    where: {
      brandId: brand.id,
    },
    select: {
      price: true,
    }
  });

  const discount_sum = totalItem.reduce((tot, arr):any => {
    return tot + arr.price.amount;
  }, 0);

  const total = {
    count : totalItem.length,
    discount_sum,
  }
  res.send({total: total, items: items });
});
