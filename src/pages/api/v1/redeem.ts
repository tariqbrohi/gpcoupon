import errorHandler from '@/pages/api/_middlewares/error-handler';
import grapherjs from '../_lib/grapherjs';
import moment from 'moment';
import prisma from '@/prisma';
import { isNil } from 'lodash';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '@/lib/errors';

export default errorHandler(
  grapherjs.withTracingHandler(async function handler(req, res) {
    const method = req.method;

    if (method !== 'post') {
      throw new NotFoundError();
    }
    console.log(req.body);
    const { amount, code, pin, sub, itemId } = req.body;

    const gift = await prisma.gift.findUnique({
      where: {
        code_pin: {
          code,
          pin,
        },
      },
      include: {
        order: {
          include: {
            item: {
              include: {
                brand: true,
              },
            },
          },
        },
      },
    });

    if (!gift) throw new NotFoundError('');

    const { item } = gift.order;

    // if gift is expired
    if (
      gift.status === 'expired' ||
      moment().unix() >=
        moment(gift.order.createdAt * 1000)
          .add(item.expiresIn, 'days')
          .unix()
    ) {
      throw new BadRequestError('Gift expired');
    }

    // if gift is already used.
    if (gift.status === 'used') throw new BadRequestError('Gift already used');

    // If requested gift detail is different thant what is in db.
    if (item.id !== itemId || item.brand?.sub !== sub) {
      throw new BadRequestError('');
    }

    if (item.type === 'GIFT_ICON') {
      await prisma.gift.update({
        where: {
          id: gift.id,
        },
        data: {
          status: 'used',
          updatedAt: moment().unix(),
        },
      });

      return res.send(true);
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
