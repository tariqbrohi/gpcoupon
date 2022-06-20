import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';
import moment from 'moment';

const prisma = new PrismaClient();

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method?.toLowerCase();
  if (method !== 'delete' && method !== 'get' && method !== 'put') {
    return res.status(404).send({
      errors: [
        {
          message: 'NotFound',
        },
      ],
    });
  }

  try {
    const { id } = req.query as any;

    if (method === 'delete') {
      const deletedItem = await prisma.item.delete({
        where: {
          id: id as string,
        },
      });

      res.send(deletedItem);
    }

    if (method == 'get') {
      const coupon = await prisma.item.findUnique({
        where: {
          id,
        },
      });

      res.send(coupon);
    }

    if (method === 'put') {
      await prisma.item.update({
        where: { id },
        data: req.body,
      });

      res.send({});
    }
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
