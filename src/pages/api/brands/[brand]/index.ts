import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { omit } from 'lodash';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method?.toLowerCase();
  if (method !== 'get' && method !== 'put' && method !== 'delete') {
    return res.status(404).send({
      errors: [
        {
          message: 'NotFound',
        },
      ],
    });
  }

  try {
    const { brand } = req.query as any;

    if (method === 'get') {
      const b = await prisma.brand.findFirst({
        where: {
          slug: brand,
        },
      });

      res.send(b);
    }
  } catch (err: any) {
    console.log(err);
    res.send([]);
  }
}
