import errorHandler from '@/pages/api/_middlewares/error-handler';
import isAuth from '@/pages/api/_middlewares/is-auth';
import prisma from '@/prisma';
import { NotFoundError } from '@/lib/errors';
import { isEmpty } from 'lodash';

export default isAuth(
  errorHandler(async function handler(req, res) {
    if (req.method === 'get') {
      const { id, orderId } = req.query as any;
      console.log(req.query);
      const order = (await prisma.order.findFirst({
        where: {
          id: orderId,
          senderId: id,
        },
      })) as any;

      if (!order) throw new NotFoundError('Order not found');

      const gifts = await prisma.gift.findMany({
        where: {
          orderId,
        },
      });

      if (!isEmpty(gifts)) {
        console.log({
          order,
          qrcodes: gifts.map((gift) => ({
            code: gift.code,
            pin: gift.pin,
            orderId,
            sub: order.item.brand.sub,
            isGP: true,
            originalPrice: order.item.originalPrice,
            name: order.item.name,
            extednedName: order.item.extendedName,
            brandName: order.item?.brand?.name!,
            amount: order.item.amount,
          })),
        });
        return res.send({
          order,
          qrcodes: gifts.map((gift) => ({
            code: gift.code,
            pin: gift.pin,
            orderId,
            sub: order.item.brand.sub,
            isGP: true,
            originalPrice: order.item.originalPrice,
            name: order.item.name,
            extednedName: order.item.extendedName,
            brandName: order.item?.brand?.name!,
            amount: order.item.amount,
          })),
        });
      }

      res.send({
        order,
      });
    }
  }),
);
