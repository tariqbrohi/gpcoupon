import errorHandler from '@/pages/api/_middlewares/error-handler';
import gpointwallet from '@/pages/api/_lib/gpointwallet';
import moment from 'moment';
import prisma from '@/prisma';
import xoxoday from '@/pages/api/_lib/xoxoday';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '@/lib/errors';

export default withApiAuthRequired(
  errorHandler(async function handler(req, res) {
    if (req.method !== 'post' && req.method !== 'get') {
      throw new NotFoundError();
    }

    if (req.method === 'post') {
      const {
        amount,
        recipient,
        username,
        password,
        itemId,
        quantity,
        message,
        slug,
      } = req.body;
      const sender = getSession(req, res)?.user;
      const timestamp = moment().unix();

      const [dbItem, xoxoItem] = await Promise.all([
        prisma.item.findFirst({
          where: {
            slug,
          },
        }),
        xoxoday.vouchers.findOne({ amount: +amount, itemId }),
      ]);

      if (!dbItem && !xoxoItem) throw new NotFoundError('Item not found');

      const currency = (
        dbItem?.currency || xoxoItem?.currency === 'USD'
          ? 'GPT'
          : xoxoItem?.currency
      )!;
      const discountRate = xoxoItem?.discountRate || dbItem?.discountRate || 0;

      // gpointwallet
      const session = await gpointwallet.getSession(username, password);

      let charge;

      try {
        charge = await gpointwallet.charge({
          userId: session?.user.id,
          amount,
          currency,
          margin: discountRate,
          t: session?.token,
        });
      } catch (err) {
        console.log(err);
      }
      //

      if (!charge || !charge?.id) {
        throw new InternalServerError();
      }

      let orderId = '';

      if ((dbItem && xoxoItem) || xoxoItem) {
        const order = await xoxoday.orders.place({
          productId: itemId,
          quantity,
          denomination: +amount,
          // todo
          // remove this and implement custom email
          notifyAdminEmail: 1,
          notifyReceiverEmail: 1,
          email: recipient.email,
        });

        if (!order) {
          // todo
          // slack notify with gpointwallet transaction id and etc...
          throw new InternalServerError();
        }

        orderId = `${order.orderId}`;
      }

      if (dbItem) {
        const { id } = await prisma.order.create({
          data: {
            // status: order.orderStatus as any,
            status: 'approved',
            senderId: sender?.sub,
            recipient: {
              set: recipient,
            },
            message,
            item: {
              connect: {
                id: dbItem.id,
              },
            },
            metadata: {
              gpointwallet: charge,
            },
            payment: {
              set: {
                paymentVendor: 'GPOINT',
                discountRate,
                totalAmount: amount * quantity,
                exchange: {
                  exchangeRate: charge.exRate || 1,
                  source: currency,
                  target: 'GPT',
                },
                price: {
                  amount,
                  currency,
                },
              },
            },
            createdAt: timestamp,
            updatedAt: timestamp,
          },
        });

        orderId = `${id}-${orderId}`;
      }

      res.send(orderId);
    }
  }),
);
