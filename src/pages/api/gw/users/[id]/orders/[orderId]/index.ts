import errorHandler from '@/pages/api/_middlewares/error-handler';
import isAuth from '@/pages/api/_middlewares/is-auth';
import prisma from '@/prisma';
import { NotFoundError } from '@/lib/errors';
import { isEmpty } from 'lodash';
import xoxoday from '@/pages/api/_lib/xoxoday';
import { stripe } from '@/pages/api/_lib/stripe';

export default isAuth(
  errorHandler(async function handler(req, res) {
    if (req.method === 'get') {
      const { id, orderId } = req.query as any;

      const order = await prisma.order.findFirst({
        where: {
          id: orderId,
          senderId: id,
        },
      });

      if (!order) throw new NotFoundError('Order not found');

      const paymentMethod: Record<string, any> = {};

      if (order.payment.paymentVendor === 'STRIPE') {
        const charges = await stripe.charges.list({
          payment_intent: (order.metadata as any).stripe,
        });

        const charge = charges.data[0];

        paymentMethod.type = 'card';
        paymentMethod.last4 = charge.payment_method_details?.card?.last4;
        paymentMethod.brand = charge.payment_method_details?.card?.brand;
      } else {
        paymentMethod.type = 'gpoint';
      }

      const item = order.item as any;

      if (!item.affiliate) {
        const data = await xoxoday.orders.detail(
          +(order.metadata as any)?.xoxoOrderId || 0,
        );

        if (!data) throw new NotFoundError('Order not found');

        return res.send({
          order,
          vouchers: data.data.getOrderDetails.data.vouchers,
          paymentMethod,
          status: data.data.getOrderDetails.data.deliveryStatus,
        });
      }

      const gifts = await prisma.gift.findMany({
        where: {
          orderId,
        },
      });

      if (!isEmpty(gifts)) {
        return res.send({
          order,
          qrcodes: gifts.map((gift) => ({
            code: gift.code,
            pin: gift.pin,
            orderId,
            sub: item.brand.sub,
            isGP: true,
            originalPrice: item.originalPrice,
            name: item.name,
            extednedName: item.extendedName,
            brandName: item?.brand?.name!,
            amount: item.amount,
          })),
          paymentMethod,
        });
      }

      res.send({
        order,
        paymentMethod,
      });
    }
  }),
);
