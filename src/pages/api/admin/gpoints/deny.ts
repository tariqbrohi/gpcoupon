import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import moment from 'moment';
import { gpointOrderDenied } from '../../_lib/send-email';

export default withApiAuthRequired(
  errorHandler(async function handler(req, res) {
    if (req.method !== 'post') {
      throw new NotFoundError();
    }

    const { id, reason } = req.body;
    console.log(req.body, ' body');
    const order = await prisma.gPointOrder.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      throw new BadRequestError('Order not found');
    }

    const timestamp = moment().unix();

    await prisma.gPointOrder.update({
      where: {
        id,
      },
      data: {
        status: 'DENIED',
        updatedAt: timestamp,
      },
    });

    gpointOrderDenied({
      recipientEmail: (order.sender as any).email,
      reason,
      orderId: order.id,
      name: (order.sender as any).name,
    });

    res.send(true);
  }),
);
