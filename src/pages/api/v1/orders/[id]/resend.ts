import errorHandler from '@/pages/api/_middlewares/error-handler';
import gpointwallet from '@/pages/api/_lib/gpointwallet';
import prisma from '@/prisma';
import QRCode from 'qrcode';
import { sendOrder } from '@/pages/api/_lib/send-email';
import withApiAuthRequired from '@/pages/api/_middlewares/with-api-auth-required';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthenticatedError,
} from '@/lib/errors';

export default withApiAuthRequired(
  errorHandler(async function handler(req, res) {
    if (req.method !== 'post') {
      throw new NotFoundError();
    }

    const session = gpointwallet.getSession(req);

    if (!session) throw new UnauthenticatedError();

    const { user, token } = session;
    const { id } = req.query as any;

    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    const gifts = await prisma.gift.findMany({
      where: {
        orderId: id,
      },
    });

    if (!order) throw new NotFoundError('Order not found');

    if (order?.senderId !== user.id) {
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
    console.log({
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

    res.send('');
  }),
);
