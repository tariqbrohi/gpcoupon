import errorHandler from '@/pages/api/_middlewares/error-handler';
import gpointwallet from '@/pages/api/_lib/gpointwallet';
import moment from 'moment';
import prisma from '@/prisma';
import randomString from '@/lib/random-string';
import sendEmail from '../../_lib/send-email';
import withApiAuthRequired from '../../_middlewares/with-api-auth-required';
import xoxoday from '@/pages/api/_lib/xoxoday';
import {
  ORDER_CREATED,
  OrderCreatedData,
} from '../../_lib/send-email/templates';
import QRCode from 'qrcode';
import { Prisma } from '@prisma/client';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthenticatedError,
} from '@/lib/errors';
import { times } from 'lodash';

export default withApiAuthRequired(
  errorHandler(async function handler(req, res) {
    if (req.method !== 'post' && req.method !== 'get') {
      throw new NotFoundError();
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

      if (!dbItem && !xoxoItem) throw new NotFoundError('Item not found');

      const currency = (
        dbItem?.currency || xoxoItem?.currency === 'USD'
          ? 'GPT'
          : xoxoItem?.currency
      )!;
      const discountRate = xoxoItem?.discountRate || dbItem?.discountRate || 0;

      // gpointwallet
      const session = gpointwallet.getSession(req);

      let charge;

      if (!session) {
        throw new UnauthenticatedError();
      }

      const { user, token } = session;

      try {
        charge = await gpointwallet.charge({
          userId: user?.id,
          amount: amount * quantity,
          currency,
          margin: discountRate,
          t: token,
          name: `${dbItem?.name || xoxoItem?.name || ''} (${quantity})`,
        });
      } catch (err: any) {
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

      if (dbItem) {
        const data: Prisma.OrderCreateInput = {
          // status: order.orderStatus as any,
          status: 'approved',
          senderId: user?.id,
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
        };

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
                  itemId,
                  sub: dbItem.brand?.sub,
                }),
              ),
            ),
          );

          const qrcodes = await Promise.all(qrcodesPromises);

          sendEmail<OrderCreatedData>({
            to: recipient.email,
            templateId: ORDER_CREATED,
            dynamicTemplateData: {
              itemImage: dbItem.imageUrls.large,
              couponImageUrl: dbItem.couponImageUrl,
              name: dbItem.name,
              brandLogoUrl: dbItem.brand?.thumbnailUrl!,
              brandName: dbItem.brand!.name,
              expiresIn: dbItem.expiresIn!,
              redemptionInstructions: dbItem.redemptionInstructions,
              termsAndConditionsInstructions:
                dbItem.termsAndConditionsInstructions,
              qrcodes: new Array(quantity)
                .fill(0)
                .map(
                  (_, i) =>
                    `<img class="image"  src="cid:${i}23456"  style="width: 150px; height: 150px;" />`,
                )
                .join(' '),
            },
            attachments: qrcodes.map((qr, i) => ({
              filename: `qr-${i}.png`,
              content: qr.replace('data:image/png;base64,', ''),
              contentType: 'image/png',
              content_id: `${i}23456`,
              cid: `${i}23456`,
              disposition: 'inline',
            })),
          });
        }
      }

      // todo
      // send email

      res.send(orderId);
    }
  }),
);
