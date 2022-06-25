import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import NextCors from 'nextjs-cors';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: process.env.GPOINT_API_URI,
  });

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
    const { id, code, accountId, t } = req.body;

    console.log(`t = ${t}`);

    if (t !== 'thisisfortemporaryshit') {
      return res.status(403).send({
        errors: [
          {
            message: 'Bad Request.',
          },
        ],
      });
    }

    if (!id || !code || !accountId) {
      return res.status(400).send({
        errors: [
          {
            message: 'Bad Request',
          },
        ],
      });
    }

    const coupon = await prisma.coupon.findUnique({
      where: {
        id,
      },
    });

    if (!coupon) {
      return res.status(400).send({
        errors: [
          {
            message: 'Invalid input',
          },
        ],
      });
    }

    const order = await prisma.order.findUnique({
      where: {
        id: coupon.orderId as any,
      },
    });

    if (!code || `${order?.code}` !== `${code}`) {
      return res.status(400).send({
        errors: [
          {
            message: 'Invalid input',
          },
        ],
      });
    }

    await prisma.coupon.update({
      where: {
        id,
      },
      data: {
        used: true,
        usedBy: accountId,
      },
    });

    res.send({});
  } catch (err: any) {
    res.status(400).send({
      errors: [
        {
          message: 'Something went wrong. Please try again.',
        },
      ],
    });
  }
}
