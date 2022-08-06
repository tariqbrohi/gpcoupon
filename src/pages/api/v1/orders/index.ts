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
  ORDER_CREATED,
  OrderCreatedData,
} from '../../_lib/send-email/templates';
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthenticatedError,
} from '@/lib/errors';

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
      const { amount, recipient, itemId, quantity, message, slug } = req.body;

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
      const customerDiscountRate = dbItem?.customerDiscountRate || 0;
      const influencerDiscountRate = dbItem?.influencerDiscountRate || 0;
      const profitRate =
        totalDiscountRate - customerDiscountRate - influencerDiscountRate;
      // gpointwallet
      let charge;

      if (
        customerDiscountRate + influencerDiscountRate + profitRate >
        totalDiscountRate
      ) {
        console.log(`Discount rate is malformed`);
        throw new InternalServerError();
      }

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
          err?.response?.data?.errors?.[0]?.message || 'Internal Server Error',
        );
      }
      //

      if (!charge || !charge?.id) {
        throw new InternalServerError();
      }

      let orderId = '';

      if (xoxoItem || (dbItem?.metadata as any)?.productId) {
        const order = await xoxoday.orders.place({
          productId: xoxoItem?.id || (dbItem?.metadata as any).productId,
          quantity,
          denomination: +price,
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

      if (dbItem) {
        const data: Prisma.OrderCreateInput = {
          // status: order.orderStatus as any,
          status: 'approved',
          senderId: user?.id,
          recipient: {
            set: recipient,
          },
          message,
          item: dbItem,
          itemId: dbItem.id,
          metadata: {
            gpointwallet: charge,
          },
          payment: {
            set: {
              paymentVendor: 'GPOINT',
              discountRate: +customerDiscountRate,
              totalAmount: price * quantity,
              exchange: {
                exchangeRate: charge.exRate || 1,
                source: currency,
                target: 'GPT',
              },
              price: {
                amount: price,
                currency,
              },
            },
          },
          createdAt: timestamp,
          updatedAt: timestamp,
        };

        if (orderId) {
          (data.metadata as any).xoxoOrderId = `${orderId}`;
        }

        const codes = times(quantity, () => randomString(13, true));
        const pins = times(quantity, () => randomString());

        if (dbItem.affiliate) {
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

        if (dbItem.affiliate) {
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
            termsAndConditionsInstructions:
              dbItem.termsAndConditionsInstructions,
            brandName: dbItem.brand?.name!,
            itemImage: dbItem.imageUrls.medium,
          });
        }
      }

      res.send(orderId);
    }
  }),
);