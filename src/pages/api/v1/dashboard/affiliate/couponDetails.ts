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
    endDate=''
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

  let where: Record<string, any> = {
    itemId: itemId!.id,
  };

  console.log('where', where);

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

  const gifts = await prisma.gift.findMany({
    where: {
      orderId: {
        in: orders.map(({id}) => id),
      }, 
    },
    select: {
      status: true,
      createdAt: true,
      order: true,
    }
  });

  if (!gifts) throw new BadRequestError('No coupon exists!');
  
  res.send(
    {
      gifts,
    }
  );
});
