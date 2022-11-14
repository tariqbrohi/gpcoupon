import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import { Json } from 'aws-sdk/clients/robomaker';
import { json } from 'stream/consumers';

export default errorHandler(async function handler(req, res) {
  const method = req.method;

  if (method !== 'get') {
    throw new NotFoundError();
  }

  const {
    sortBy,
    sub
  } = req.body as any;

  let {
    take = 500,
    skip = 0,
  } = req.query as any;

  console.log(sortBy, sub, take, skip);

  if (typeof take !== 'number') take = Number(take);
  if (typeof skip !== 'number') skip = Number(skip);

  if (!sub ) throw new BadRequestError('No BusinessAccount Exists');

  let orderBy: Record<string, number> = {};

  if (sortBy === 'sales,desc') {
    orderBy.sortOrder = -1;
  } else if (sortBy === 'amount,desc') {
    orderBy.amount = -1;
  } else if (sortBy === 'amount,asc') { 
    orderBy.amount = 1;
  } else if (sortBy === 'createdAt,desc') {
    orderBy.createdAt = -1;
  } else {
    orderBy.createdAt = 1;
  }

  console.log('orderBy', orderBy);

  const brandId = (await prisma.brand.findFirst({
    where: {
      sub,
    },           
    select: {
      id: true,
    },
  })); 

  if (!brandId) throw new BadRequestError('No affiliate exists!');

  const items = await prisma.item.findMany({
    where: {
      brand: {
        id: brandId.id,
      },
    },
    select: {
      id: true,
    },
  });

  const [orders, ordersAll]: any = await Promise.all([
    prisma.order.aggregateRaw({
      pipeline: [
        {
          $match: {
            $expr: {
              $in: [
                "$item.id",
                items.map(({id}) => id),
              ],
            },
          },
        },
        {
          $group: {
            _id: "$item",
            count: {
              $count: {},
            },
            sum: {
              $sum: "$payment.totalAmount",
            },
          },
        },
        {
          $sort: orderBy,
        },
        {
          $limit: take,
        },
        {
          $skip: skip,
        },
      ],
    }),
    prisma.order.aggregateRaw({
      pipeline: [
        {
          $match: {
            $expr: {
              $in: [
                "$item.id",
                items.map(({id}) => id),
              ],
            },
          },
        },
        {
          $group: {
            _id: null,
            profitSum: {
              $sum: "$payment.totalAmount",
            },
          },
        },
      ]
    })
  ]);

  res.send(
    {
      total: 
        {
          profitSum: Number(ordersAll[0]!.profitSum),
        }, 
      orders: orders,
    }
  );
});
