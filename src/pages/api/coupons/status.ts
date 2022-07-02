import moment from 'moment';
import { NextApiRequest, NextApiResponse } from 'next';
import { pick } from 'lodash';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import NextCors from 'nextjs-cors';

// Initializing the cors middleware
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
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
    const { id, t } = req.body;
    const now = moment().unix();
    console.log(`t = ${t}`);

    if (t !== 'thisisfortemporaryshit') {
      return res.status(403).send({
        errors: [
          {
            message: 'Invalid id or code.',
          },
        ],
      });
    }

    const coupon = await prisma.coupon.findUnique({
      where: {
        id,
      },
    });
    console.log(coupon, ' why not');
    if (!coupon) {
      return res.status(403).send({
        errors: [
          {
            message: 'Invalid id or code.',
          },
        ],
      });
    }

    if (coupon.used) {
      return res.status(400).send({
        errors: [
          {
            message: 'This coupon has already been used.',
          },
        ],
      });
    }

    if (coupon.expiresAt <= now) {
      return res.status(400).send({
        errors: [
          {
            message: `This coupon has been expired on ${moment
              .unix(coupon.expiresAt)
              .toISOString()}`,
          },
        ],
      });
    }

    res.send(pick(coupon.item, ['amount']));
  } catch (err: any) {
    console.log(err);
    res.status(500).send({
      errors: [
        {
          message: 'Invalid id or code.',
        },
      ],
    });
  }
}
