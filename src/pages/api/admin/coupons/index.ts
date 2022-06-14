import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';

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
    if (method === 'post') {
      const { user } = getSession(req, res) || {};

      const item = await prisma.item.create({
        data: {
          ...req.body,
          display: true,
          createdBy: user?.sub,
          state: 'AVAILABLE',
          type: 'GIFT_CARD',

          notes: [
            {
              text: 'Send via Link share / Email',
            },
          ],
        },
      });

      res.send(item);
    }
  } catch (err: any) {
    res.status(err?.statusCode || 500).send({
      errors: [
        {
          message: err?.message || 'Something went wrong.',
        },
      ],
    });
  }
});
