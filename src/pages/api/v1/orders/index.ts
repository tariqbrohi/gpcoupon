import errorHandler from '@/pages/api/_middlewares/error-handler';
import gpointwallet from '@/pages/api/_lib/gpointwallet';
import moment from 'moment';
import prisma from '@/prisma';
import QRCode from 'qrcode';
import randomString from '@/lib/random-string';
import { sendOrder } from '../../_lib/send-email';
import withApiAuthRequired from '../../_middlewares/with-api-auth-required';
import xoxoday from '@/pages/api/_lib/xoxoday';
import { Prisma } from '@prisma/client';
import { times } from 'lodash';
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthenticatedError,
} from '@/lib/errors';
import { stripe } from '../../_lib/stripe';
import Stripe from 'stripe';

export default withApiAuthRequired(
  errorHandler(async function handler(req, res) {
    if (req.method !== 'post' && req.method !== 'get') {
      throw new NotFoundError();
    }

    const session = gpointwallet.getSession(req);

    if (!session) throw new UnauthenticatedError();

    const { user, token } = session;

    if (req.method === 'get') {
      const { take = 100, skip = 0 } = req.query as any;

      const orders = await prisma.order.findMany({
        where: {
          senderId: user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take,
        skip,
      });

      const normalizedGifts = orders.map((order) => ({
        orderNumber: order.id,
        item: order.item,
        payment: order.payment,
        status: order.status,
        recipient: order.recipient,
        message: order.message,
        createdAt: order.createdAt,
      }));

      return res.send(normalizedGifts);
    }

    if (req.method === 'post') {
      const {
        paymentMethodId,
        amount,
        recipient,
        itemId,
        quantity,
        message,
        slug,
      } = req.body;

      const timestamp = moment().unix();

      const [dbItem, xoxoItem] = await Promise.all([
        prisma.item.findFirst({
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
      const customerDiscountRate =
        xoxoItem?.customerDiscountRate || dbItem?.customerDiscountRate || 0;
      const influencerDiscountRate = dbItem?.influencerDiscountRate || 0;
      const profitRate =
        totalDiscountRate - customerDiscountRate - influencerDiscountRate;
      // gpointwallet
      let charge;
      // console.log(
      //   xoxoItem?.discountRate,
      //   totalDiscountRate,
      //   customerDiscountRate,
      //   profitRate,
      // );
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
            userId: user.id,
          },
        });

        if (!customer?.stripeId) {
          throw new UnauthenticatedError();
        }

        try {
          intent = await stripe.paymentIntents.create({
            amount: amount * 100 * quantity,
            currency: 'usd',
            payment_method_types: ['card'],
            customer: customer.stripeId,
            payment_method: paymentMethodId,
            confirm: true,
          });
        } catch (err: any) {
          // console.log('NOT HERE WHERE  IS IT');
          throw new BadRequestError(err.error?.error);
        }
      }
      // Pay with GPoint
      else {
        try {
          charge = await gpointwallet.charge({
            userId: user?.id,
            amount: price * +quantity,
            currency,
            influencerId: dbItem?.influencerId,
            customerDiscountRate: +customerDiscountRate,
            influencerDiscountRate: +influencerDiscountRate,
            profitRate: +profitRate,
            t: token,
            name: `${dbItem?.name || xoxoItem?.name || ''} (${quantity})`,
          });
        } catch (err: any) {
          console.log(err, ' from gpointwallet charge');
          throw new BadRequestError(
            err?.response?.data?.errors?.[0]?.message ||
              'Internal Server Error',
          );
        }
        //

        if (!charge || !charge?.id) {
          throw new InternalServerError();
        }
      }

      let orderId = '';

      if (xoxoItem) {
        const order = await xoxoday.orders.place({
          productId: +xoxoItem.id,
          quantity,
          denomination: +price,
          poNumber: charge.id,
          notifyReceiverEmail: 1,
          email: recipient.email,
        });

        if (!order) {
          console.log('SHIT');
          // todo
          // slack notify with gpointwallet transaction id and etc...
          throw new InternalServerError();
        }

        orderId = `${order.orderId}`;
      }

      const data: Prisma.OrderCreateInput = {
        // status: order.orderStatus as any,
        status: 'approved',
        senderId: user?.id,
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
              exchangeRate: charge?.exRate || 1,
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
          gpointwallet: charge.id,
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
