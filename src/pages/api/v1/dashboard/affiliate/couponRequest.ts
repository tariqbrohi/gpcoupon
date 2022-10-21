import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import { sendCouponRequest } from '@/pages/api/_lib/send-email'

export default errorHandler(async function handler(req, res) {
  const method = req.method;
  const recipientEmail = `${process.env.SEND_GRID_SUPPORT}` || 'support@gpointwallet.com';

  if (method !== 'post') {
    throw new NotFoundError();
  }

  const {
    businessName,
    phoneNumber,
    gwalletBusinessUsername,
    brandName,
    email,
    couponInfo
  } = req.query as any;

  console.log(businessName, phoneNumber, gwalletBusinessUsername, brandName, email, couponInfo);

  sendCouponRequest({
    recipientEmail,
    businessName,
    phoneNumber,
    gwalletBusinessUsername,
    brandName,
    email,
    couponInfo
  });

  res.send(
    {
      result: 'ok'
    }
  );
});
