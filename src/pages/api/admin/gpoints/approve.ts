import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import moment from 'moment';
import { gpointOrderApproved } from '../../_lib/send-email';
import { times } from 'lodash';

const randomString = (length: number) => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export default withApiAuthRequired(
  errorHandler(async function handler(req, res) {
    if (req.method !== 'post') {
      throw new NotFoundError();
    }

    const { id } = req.body;

    const order = await prisma.gPointOrder.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      throw new BadRequestError('Order not found');
    }

    const timestamp = moment().unix();

    const credentials = times(order.qty).map(() => ({
      code: randomString(12),
      pin: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    }));

    const orderWithGifts = await prisma.gPointOrder.update({
      where: {
        id,
      },
      data: {
        status: 'APPROVED',
        updatedAt: timestamp,
        gifts: {
          createMany: {
            data: credentials.map((cred) => ({
              code: cred.code,
              pin: cred.pin.toString(),
              amount: (order.gpoint as any).amount,
              status: 'available',
              createdAt: timestamp,
              updatedAt: timestamp,
            })),
          },
        },
      },
      select: {
        gifts: true,
      },
    });

    const data = orderWithGifts.gifts.map((gift) => ({
      id: gift.id,
      orderid: gift.orderId,
      code: gift.code,
      pin: gift.pin,
      gpoint: order.gpoint,
    }));

    const link = `${process.env.AUTH0_BASE_URL}/g/${btoa(
      JSON.stringify(data),
    )}`;

    gpointOrderApproved({
      recipientEmail: order.recipient.email,
      message: '',
      link,
      giver: (order.sender as any).name,
    });

    res.send(true);
  }),
);
