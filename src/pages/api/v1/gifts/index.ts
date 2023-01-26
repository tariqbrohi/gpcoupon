import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import withApiAuthRequired from '../../_middlewares/with-api-auth-required';
import { NotFoundError } from '@/lib/errors';

export default withApiAuthRequired(
  errorHandler(async function handler(req, res) {
    if (req.method !== 'get') {
      throw new NotFoundError();
    }

    const { key } = req.query;

    const orderWithGifts = await prisma.gPointOrder.findFirst({
      where: {
        uniqueId: key as string,
      },
      include: {
        gifts: {
          include: {
            order: true,
          },
        },
      },
    });

    if (!orderWithGifts) {
      throw new NotFoundError();
    }

    const data = orderWithGifts.gifts.map((gift) => ({
      id: gift.id,
      orderid: gift.orderId,
      code: gift.code,
      pin: gift.pin,
      gpoint: gift.order.gpoint,
    }));

    res.send(data);
  }),
);
