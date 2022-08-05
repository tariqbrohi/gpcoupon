import errorHandler from '@/pages/api/_middlewares/error-handler';
import grapherjs from '../_lib/grapherjs';
import moment from 'moment';
import prisma from '@/prisma';
import { BadRequestError, NotFoundError } from '@/lib/errors';

export default errorHandler(
  grapherjs.withTracingHandler(async function handler(req, res) {
    const method = req.method;

    if (method !== 'post') {
      throw new NotFoundError();
    }

    const { code, pin } = req.body;

    const gift = await prisma.gift.findUnique({
      where: {
        code_pin: {
          code,
          pin,
        },
      },
      include: {
        order: true,
      },
    });

    if (!gift) throw new NotFoundError('');

    const { item } = gift.order;

    // if gift is expired
    if (
      gift.status === 'expired' ||
      moment().unix() >=
        moment(gift.order.createdAt * 1000)
          .add((item as any).expiresIn, 'days')
          .unix()
    ) {
      return res.send({
        status: 'expired',
      });
    }

    // if gift is already used.
    if (gift.status === 'used') {
      return res.send({
        status: 'used',
      });
    }

    res.send(gift);
  }),
);
