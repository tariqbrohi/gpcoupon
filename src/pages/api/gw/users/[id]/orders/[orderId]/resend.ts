import errorHandler from '@/pages/api/_middlewares/error-handler';
import isAuth from '@/pages/api/_middlewares/is-auth';
import prisma from '@/prisma';
import QRCode from 'qrcode';
import { sendOrder } from '@/pages/api/_lib/send-email';
import { BadRequestError, ForbiddenError, NotFoundError } from '@/lib/errors';

export default isAuth(
  errorHandler(async function handler(req, res) {
    console.log(req.method);
    if (req.method !== 'post') {
      throw new NotFoundError();
    }
    const { id, orderId } = req.query as any;
    console.log(req.query);
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    const gifts = await prisma.gift.findMany({
      where: {
        orderId,
      },
    });

    if (!order) throw new NotFoundError('Order not found');

    if (order?.senderId !== id) {
      throw new ForbiddenError();
    }

    const item = order.item as any;

    if (!item.affiliate) {
      throw new BadRequestError('');
    }

    const quantity = order.payment.totalAmount / order.payment.price.amount;

    const qrcodesPromises = gifts.map((gift, i) =>
      QRCode.toDataURL(
        btoa(
          JSON.stringify({
            code: gift.code,
            pin: gift.pin,
            orderId: id,
            sub: item.brand?.sub,
          }),
        ),
      ),
    );

    const qrcodes = await Promise.all(qrcodesPromises);

    sendOrder({
      quantity,
      qrcodes,
      recipientEmail: order.recipient.email,
      name: item.name,
      brandLogoUrl: item.brand?.thumbnailUrl!,
      couponImageUrl: item.couponImageUrl!,
      expiresIn: item.expiresIn!,
      redemptionInstructions: item.redemptionInstructions,
      termsAndConditionsInstructions: item.termsAndConditionsInstructions,
      brandName: item.brand?.name!,
      itemImage: item.imageUrls.medium,
    });

    res.send('Ok');
  }),
);
