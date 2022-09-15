import errorHandler from '@/pages/api/_middlewares/error-handler';
import isAuth from '@/pages/api/_middlewares/is-auth';
import prisma from '@/prisma';

export default isAuth(
  errorHandler(async function handler(req, res) {
    if (req.method === 'get') {
      const { id, take = 20, skip = 0 } = req.query as any;

      const orders = await prisma.order.findMany({
        where: {
          senderId: id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: +take,
        skip: +skip,
      });

      const normalizedGifts = orders.map((order) => ({
        orderNumber: order.id,
        item: order.item,
        payment: order.payment,
        status: order.status,
        recipient: order.recipient,
        message: order.message,
        createdAt: order.createdAt,
      }));

      return res.send(normalizedGifts);
    }
  }),
);
