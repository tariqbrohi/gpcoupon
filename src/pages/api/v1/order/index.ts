import errorHandler from '@/pages/api/_middlewares/error-handler';
import gpointwallet from '@/pages/api/_lib/gpointwallet';
import moment from 'moment';
import prisma from '@/prisma';
import xoxoday from '@/pages/api/_lib/xoxoday';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { InternalServerError, NotFoundError } from '@/lib/errors';

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
      } = req.body;

      const sender = getSession(req, res)?.user;

      const item = await xoxoday.vouchers.findOne({ amount: +amount, itemId });

      if (!item) throw new NotFoundError('Item not found');

      const currency = item.currency === 'USD' ? 'GPT' : item.currency;

      // gpointwallet
      const session = await gpointwallet.getSession(username, password);
      const charge = await gpointwallet.charge({
        userId: session?.user.id,
        amount,
        currency,
        margin: item.discountRate || 0,
        t: session?.token,
      });
      //

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

      if (!order) throw new InternalServerError();

      const timestamp = moment().unix();

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
              id: '62c77275a173181b651f80c1',
            },
          },
          metadata: {
            xoxoday: 'order',
            gpointwallet: charge,
          },
          payment: {
            set: {
              paymentVendor: 'GPOINT',
              discountRate: item.discountRate || 0,
              totalAmount: amount * quantity,
              exchange: {
                exchangeRate: charge.exRate,
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

      res.send(id);
    }
  }),
);
