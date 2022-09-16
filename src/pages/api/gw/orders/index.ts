import errorHandler from '@/pages/api/_middlewares/error-handler';
import isAuth from '@/pages/api/_middlewares/is-auth';
import moment from 'moment';
import prisma from '@/prisma';
import QRCode from 'qrcode';
import randomString from '@/lib/random-string';
import Stripe from 'stripe';
import xoxoday from '../../_lib/xoxoday';
import { Prisma } from '@prisma/client';
import { sendOrder } from '../../_lib/send-email';
import { stripe } from '../../_lib/stripe';
import { times } from 'lodash';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthenticatedError,
} from '@/lib/errors';

export default isAuth(
  errorHandler(async function handler(req, res) {
    if (req.method === 'post') {
      const {
        userId,
        itemId,
        amount,
        recipient,
        slug,
        quantity,
        message,
        paymentMethodId,
        transactionId,
      } = req.body;

      if (!paymentMethodId && !transactionId) {
        throw new BadRequestError(
          'Either paymentMethodId or transactionId is required',
        );
      }

      const timestamp = moment().unix();

      const [dbItem, xoxoItem] = await Promise.all([
        Number.isInteger(+itemId)
          ? Promise.resolve(null)
          : prisma.item.findFirst({
              where: {
                slug,
              },
              include: {
                brand: true,
              },
            }),
        xoxoday.vouchers.findOne({ amount: +amount, itemId }),
      ]);

      let price = +amount;

      if (dbItem) {
        price = dbItem.price.amount;
      }

      if (!dbItem && !xoxoItem) throw new NotFoundError('Item not found');

      const currency = (
        dbItem?.price.currency || xoxoItem?.price.currency === 'USD'
          ? 'GPT'
          : xoxoItem?.price.currency
      )!;

      const totalDiscountRate =
        xoxoItem?.discountRate || dbItem?.discountRate || 0;
      const customerDiscountRate = dbItem?.customerDiscountRate || 0;
      const influencerDiscountRate = dbItem?.influencerDiscountRate || 0;
      const profitRate =
        totalDiscountRate - customerDiscountRate - influencerDiscountRate;

      if (
        customerDiscountRate + influencerDiscountRate + profitRate >
        totalDiscountRate
      ) {
        console.log(`Discount rate is malformed`);
        throw new InternalServerError();
      }

      // If payment_method_id is given,
      // use stripe
      let intent: Stripe.PaymentIntent | null = null;

      if (paymentMethodId) {
        const customer = await prisma.stripe.findUnique({
          where: {
            userId: userId,
          },
        });

        if (!customer?.stripeId) {
          throw new UnauthenticatedError();
        }

        try {
          intent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'usd',
            payment_method_types: ['card'],
            customer: customer.stripeId,
            payment_method: paymentMethodId,
            confirm: true,
          });
        } catch (err: any) {
          throw new BadRequestError(err.error?.error);
        }
      }

      let orderId = '';

      if (xoxoItem) {
        const order = await xoxoday.orders.place({
          productId: +xoxoItem.id,
          quantity,
          denomination: +amount,
          // todo
          // remove this and implement custom email
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

      const data: Prisma.OrderCreateInput = {
        // status: order.orderStatus as any,
        status: 'approved',
        senderId: userId,
        recipient: {
          set: recipient,
        },
        message,
        item: (xoxoItem || dbItem)!,
        itemId: `${itemId}`,
        payment: {
          set: {
            paymentVendor: paymentMethodId ? 'STRIPE' : 'GPOINT',
            discountRate: +customerDiscountRate,
            totalAmount: price * quantity,
            exchange: {
              exchangeRate: 1,
              source: currency,
              target: paymentMethodId ? 'USD' : 'GPT',
            },
            price: {
              amount: price,
              currency: paymentMethodId ? 'USD' : currency,
            },
          },
        },
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      if (paymentMethodId && intent) {
        data.metadata = {
          stripe: intent.id,
        };
      } else {
        data.metadata = {
          gpointwallet: transactionId,
        };
      }

      if (orderId) {
        (data.metadata as any).xoxoOrderId = `${orderId}`;
      }

      const codes = times(quantity, () => randomString(13, true));
      const pins = times(quantity, () => randomString());

      if (dbItem?.affiliate) {
        data.gifts = {
          createMany: {
            data: times(quantity, (i) => ({
              code: codes[i],
              amount,
              pin: pins[i],
              status: 'available',
              createdAt: timestamp,
              updatedAt: timestamp,
            })),
          },
        };
      }

      const { id } = await prisma.order.create({
        data,
      });

      orderId = `${id}-${orderId}`;

      if (dbItem?.affiliate) {
        const qrcodesPromises = new Array(quantity).fill(0).map((_, i) =>
          QRCode.toDataURL(
            btoa(
              JSON.stringify({
                code: codes[i],
                pin: pins[i],
                orderId,
                sub: dbItem.brand?.sub,
                isGP: true,
                originalPrice: dbItem.originalPrice,
                name: dbItem.name,
                extednedName: dbItem.extendedName,
                brandName: dbItem?.brand?.name!,
                amount: dbItem.amount,
              }),
            ),
          ),
        );

        const qrcodes = await Promise.all(qrcodesPromises);

        sendOrder({
          quantity,
          qrcodes,
          recipientEmail: recipient.email,
          name: dbItem.name,
          brandLogoUrl: dbItem.brand?.thumbnailUrl!,
          couponImageUrl: dbItem.couponImageUrl!,
          expiresIn: dbItem.expiresIn!,
          redemptionInstructions: dbItem.redemptionInstructions,
          termsAndConditionsInstructions: dbItem.termsAndConditionsInstructions,
          brandName: dbItem.brand?.name!,
          itemImage: dbItem.imageUrls.medium,
        });
      }

      res.send(orderId);
    }
  }),
);
