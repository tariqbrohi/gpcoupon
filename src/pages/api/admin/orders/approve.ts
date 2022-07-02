import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { OrderStatus, PrismaClient } from '@prisma/client';
import moment from 'moment';
import { encode } from 'js-base64';
import { sendCoupon } from '../../../../lib/send-email';

const prisma = new PrismaClient();

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method?.toLowerCase();

  if (method !== 'post') {
    return res.status(404).send({
      errors: [
        {
          message: 'NotFound',
        },
      ],
    });
  }

  try {
    const { id } = req.body;

    const order = (await prisma.order.findUnique({
      where: {
        id,
      },
    })) as any;

    if (!order) {
      return res.status(404).send({
        errors: [
          {
            message: 'Order NotFound',
          },
        ],
      });
    }

    const promises = new Array(order.quantity).fill(0).map(() =>
      prisma.coupon.create({
        data: {
          item: order.item,
          expiresAt: moment().add(order.item.expiresIn, 'days').unix(),
          orderId: order.id,
        },
      }),
    );

    await prisma.$transaction([
      ...promises,
      prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          status: OrderStatus.approved,
        },
      }),
    ]);

    console.log(`order id = ${order.id}`);

    console.log(`sending - `, {
      to: order.receiverEmail,
      dynamicTemplateData: {
        giver: order.senderName,
        link: `${process.env.GPOINT_WALLET_URI}/g/${encode(
          `${order.id}:${order.code}`,
        )}`,
        // message: "",
      },
    });

    sendCoupon({
      to: order.receiverEmail,
      dynamicTemplateData: {
        giver: order.senderName,
        link: `https://coupon.gpointwallet.com/g/${encode(
          `${order.id}:${order.code}`,
        )}`,
        // message: "",
      },
    });

    res.status(201).send({});
  } catch (err: any) {
    res.status(err).send({
      errors: [
        {
          message: err?.message || 'Something went wrong.',
        },
      ],
    });
  }
});
