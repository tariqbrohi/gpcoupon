import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { omit } from 'lodash';

const prisma = new PrismaClient();

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method?.toLowerCase();

  if (method !== 'put' && method !== 'delete') {
    return res.status(404).send({
      errors: [
        {
          message: 'NotFound',
        },
      ],
    });
  }

  const { id } = req.query as any;

  try {
    if (method === 'put') {
      await prisma.brand.update({
        where: {
          id,
        },
        data: omit(req.body, ['createdAt', 'updatedAt', 'id']),
      });

      res.send({});
    }

    if (method === 'delete') {
      const b = await prisma.brand.findUnique({
        where: {
          id,
        },
      });

      await prisma.$transaction([
        prisma.item.deleteMany({
          where: {
            brand: b?.slug,
          },
        }),
        prisma.brand.delete({
          where: {
            id,
          },
        }),
      ]);

      res.send({});
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).send({
      errors: [
        {
          message: 'Opps Something went wrong',
        },
      ],
    });
  }
});
