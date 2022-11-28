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
    slug,
    startDate='',
    endDate='',
    status='all'
  } = req.query as any;

  let {
    take = 500,
    skip = 0,
  } = req.query as any;

  if (typeof take !== 'number') take = Number(take);
  if (typeof skip !== 'number') skip = Number(skip);

  if (!slug ) throw new BadRequestError('No Item Exists');
  const itemId = await prisma.item.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
    }
  });

  const orderBy: Record<string, any> = {
    createdAt: 'desc',
  };

  let where: Record<string, any> = {
    itemId: itemId!.id,
  };

  if (startDate !== '' && endDate !== '') {
    where.createdAt= {
      lte: convertDateToUnix(endDate.replace("/", "-")),
      gte: convertDateToUnix(startDate.replace("/", "-")),
    }
  }

  const orders = await prisma.order.findMany({
    where,
    select: {
      id: true,
    }
  });

  if (!orders) throw new BadRequestError('No order exists!');

  let giftWhere: Record<string, any>= {
    orderId: {
      in: orders.map(({id}) => id),
    }
  }

  if (status !== 'all') {
    giftWhere.status = status;
  }

  const giftPromises = [
    prisma.gift.findMany({
      where: giftWhere,
      select: {
        status: true,
        createdAt: true,
        order: true,
      },
      skip,
      take,
      orderBy
    }), //data
    prisma.gift.findMany({
      where: giftWhere,
      select: {
        status: true,
        createdAt: true,
        order: true,
      },
    }), //totalCount
  ]

  if (status === 'all' || status === 'used') {
    giftPromises.push(
      prisma.gift.findMany({
        where: {
          status: "used",
          orderId: {
            in: orders.map(({id}) => id),
          },
        },
        select: {
          status: true,
          order: true,
          createdAt: true,
        },
      })// totalProfit
    );
  }

  const gifts = await Promise.all(giftPromises);
    
    const totalProfit = gifts[2]?.reduce((tot: number, gift: any) => {
      return tot + (gift?.order?.item?.amount);
    }, 0) || 0;

  if (!gifts[0]) throw new BadRequestError('No coupon exists!');

  res.send(
    {
      totalCount : gifts[1].length, 
      totalProfit,
      gifts: gifts[0],
    }
  );
});
