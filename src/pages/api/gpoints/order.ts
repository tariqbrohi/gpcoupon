import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { restClient } from '@polygon.io/client-js';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '@/lib/errors';
import moment from 'moment';
import gpointwallet from '../_lib/gpointwallet';
import { gpointOrderProcessing } from '../_lib/send-email';
import currencyFormat from '@/lib/currency-format';

const rest = restClient(process.env.POLYGON_SECRET!);

export default errorHandler(async function handler(req, res) {
  if (req.method !== 'post') {
    throw new NotFoundError();
  }

  const { id, qty, recipientName, recipientEmail, code } = req.body;

  const gpoint = await prisma.gPoint.findUnique({
    where: {
      id,
    },
  });

  if (!gpoint) throw new NotFoundError('GPoint not found');

  const previousClosed = await rest.forex.previousClose(`C:USDKRW`);

  const timestamp = moment().unix();

  const session = gpointwallet.getSession(req);

  if (!session) throw new UnauthenticatedError();

  const { user, token } = session;

  const order = await prisma.gPointOrder.create({
    data: {
      gpoint,
      gpointId: id,
      qty,
      exchangeRate: previousClosed.results?.[0].h!,
      recipient: {
        name: recipientName,
        email: recipientEmail,
      },
      status: 'PENDING',
      sender: {
        id: user.id,
        email: user.profile.contact.email,
        name: user.username,
      },
      code,
      createdAt: timestamp,
      updatedAt: timestamp,
      totalPrice: qty * previousClosed.results?.[0].h! * gpoint.amount,
    },
  });

  gpointOrderProcessing({
    recipientEmail: user.profile.contact.email,
    orderId: order.id,
    name: user.username,
    coupon: `${gpoint.name} / qty: ${qty}`,
    totalPrice: currencyFormat(order.totalPrice, 'KRW'),
  });

  res.send(order);
});
