import currencyFormat from '@/lib/currency-format';
import errorHandler from '@/pages/api/_middlewares/error-handler';
import gpointwallet from '../_lib/gpointwallet';
import moment from 'moment';
import prisma from '@/prisma';
import { generate } from 'short-uuid';
import { gpointOrderProcessing } from '../_lib/send-email';
import { NotFoundError, UnauthenticatedError } from '@/lib/errors';
import { restClient } from '@polygon.io/client-js';

const rest = restClient(process.env.POLYGON_SECRET!);

export default errorHandler(async function handler(req, res) {
  if (req.method !== 'post') {
    throw new NotFoundError();
  }

  const { id, qty, recipientName, recipientEmail, exchangeRate } = req.body;

  const gpoint = await prisma.item.findUniqueOrThrow({
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

  const totalPrice = qty * exchangeRate * gpoint.price.amount;
  console.log(gpoint);
  console.log(`totalPrice: ${totalPrice}`);
  const order = await prisma.gPointOrder.create({
    data: {
      gpoint,
      gpointId: id,
      qty: +qty,
      uniqueId: generate(),
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
      createdAt: timestamp,
      updatedAt: timestamp,
      totalPrice,
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
