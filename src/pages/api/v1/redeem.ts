import errorHandler from '@/pages/api/_middlewares/error-handler';
import grapherjs from '../_lib/grapherjs';
import moment from 'moment';
import prisma from '@/prisma';
import { isNil } from 'lodash';
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from '@/lib/errors';
import { Item } from '@prisma/client';

export default errorHandler(
  grapherjs.withTracingHandler(async function handler(req, res) {
    const method = req.method;

    if (method !== 'post') {
      throw new NotFoundError();
    }

    const { amount, code, pin, sub, orderId, t } = req.body;

    if (t !== 'thisisfortemporaryshit') {
      throw new ForbiddenError();
    }

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

    if (!gift || gift.order.id !== orderId) throw new NotFoundError('');

    const { item } = gift.order;

    // if gift is expired
    if (
      gift.status === 'expired' ||
      moment().unix() >=
        moment(gift.order.createdAt * 1000)
          .add((item as Item).expiresIn, 'days')
          .unix()
    ) {
      throw new BadRequestError('Gift expired');
    }

    // if gift is already used.
    if (gift.status === 'used') throw new BadRequestError('Gift already used');

    // If requested gift detail is different thant what is in db.
    console.log((item as any).brand?.sub);
    if ((item as any).brand?.sub !== sub) {
      throw new BadRequestError('');
    }

    if ((item as Item).type === 'GIFT_ICON') {
      await prisma.gift.update({
        where: {
          id: gift.id,
        },
        data: {
          status: 'used',
          updatedAt: moment().unix(),
        },
      });

      return res.send(item);
    }

    // For GIFT_CARD
    if (isNil(gift.amount)) {
      // todo
      // slack

      throw new InternalServerError();
    }

    const diff = +amount - gift.amount;

    await prisma.gift.update({
      where: {
        id: gift.id,
      },
      data: {
        amount: diff >= 0 ? 0 : diff * -1,
        updatedAt: moment().unix(),
        status: diff >= 0 ? 'used' : 'available',
      },
    });

    res.send({
      remainingAmountToPay: diff < 0 ? 0 : diff,
      remainingBalance: diff >= 0 ? 0 : diff * -1,
    });
    // res.send(true);
  }),
);
