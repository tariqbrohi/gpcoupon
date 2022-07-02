import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method?.toLowerCase();
  if (method !== 'get') {
    return res.status(404).send({
      errors: [
        {
          message: 'NotFound',
        },
      ],
    });
  }

  try {
    if (method === 'get') {
      const { country, slug } = req.query as any;

      const where: any = {
        country,
        slug,
      };

      // If only id is passed, it query one item
      const item = await prisma.item.findFirst({
        where,
      });

      res.send(item);
    }
  } catch (err: any) {
    console.log(err);
    res.send([]);
  }
}
