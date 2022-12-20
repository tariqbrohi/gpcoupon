import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import convertDateToUnix from '@/lib/convertDateToUnix';

export default errorHandler(async function handler(req, res) {
  const method = req.method;

  if (method !== 'get') {
    throw new NotFoundError();
  }

  const {
    sub,
    startDate,
    endDate,
    status
  } = req.query as any;

  if ((startDate !== '' && endDate === '') || (startDate === '' && endDate !== ''))
  {
    throw(new BadRequestError('Missing data'));
  }

  let {
    take = 500,
    skip = 0,
  } = req.query as any;

  if (typeof take !== 'number') take = Number(take);
  if (typeof skip !== 'number') skip = Number(skip);

  if (!sub ) throw new BadRequestError('No BusinessAccount Exists');

  // when an affiliate(merchant) can create multiple brand
  // To do: create multiple brand and items and test 
  const brandId = await prisma.brand.findMany({
    where: {
      sub,
    },
    select: {
      id: true,
    },
  });

  if (!brandId) throw new BadRequestError('No affiliate exists!');

  // when an affiliate(merchant) can create multiple brand
  // To do: create multiple brand and items and test 
  const items = await prisma.item.findMany({
    where: {
      brand: {
        id: {
          in: brandId.map(({id}) => id)
        }
      }
    },
    select: {
      id: true,
    },
  });

  const match : any = [];

  if (status !== 'ALL') {
    match.push({ "item.status": status })
  }

  match.push(
    {
      $expr: {
        $in: [
          "$item.id",
          items.map(({id}) => id),
        ],
      },
    }
  );

  // order table createdAt : unixepoc format
  if (startDate !== '' && endDate !== ''){
    match.push({
      createdAt: {
        "$gte": convertDateToUnix(startDate),
        "$lte": convertDateToUnix(endDate)
      }
    });
  }

  const [orders, ordersProfit, ordersCount]: any = await Promise.all([
    prisma.order.aggregateRaw({
      pipeline: [
        {
          $match:{
            $and: match
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
          $sort: {
            "_id.name": 1, // sort by item.name ascending
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: take,
        },
      ],
    }),
    // for total.profitSum
    prisma.order.aggregateRaw({
      pipeline: [
        {
          $match: {
            $and: match,
          },
        },
        {
          $group: {
            _id: null,
            profitSum: {
              $sum: {
                $multiply: 
                  [{$divide: ["$payment.totalAmount", "$payment.price.amount"]}, "$item.amount" ]
              }
            },
          },
        },
      ],
    }),
    // for total.count
    prisma.order.aggregateRaw({
      pipeline: [
        {
          $match: {
            $and: match,
          },
        },
        {
          $group: {
            _id: "$item",
          },
        },
      ]
    })
  ]);

  res.send(
    {
      total: 
        {
          count: ordersCount.length,
          profitSum: ordersProfit[0]?.profitSum || 0,
        }, 
      orders: orders,
    }
  );
});
