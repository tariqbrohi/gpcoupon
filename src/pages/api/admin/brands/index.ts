import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { BadRequestError, NotFoundError } from '@/lib/errors';

const prisma = new PrismaClient();

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method?.toLowerCase();

  if (method !== 'post') {
    throw new NotFoundError();
  }

  try {
    if (!req.body.name || !req.body.backgroundUrl || !req.body.thumbnailUrl) {
      throw new BadRequestError('Required field(s) are missing.');
    }

    if (method === 'post') {
      const existingBrand = await prisma.brand.findFirst({
        where: {
          slug: req.body.slug,
        },
      });

      if (existingBrand) {
        throw new BadRequestError('Duplicate slug.');
      }

      const { id, categories, ...rest } = req.body;
      const timestamp = +(new Date().valueOf() / 1000).toFixed(0);
      const brand = await prisma.brand.create({
        data: {
          ...rest,
          disclaimer: '',
          terms: '',
          status: 'AVAILABLE',
          categoryIDs: categories,
          createdAt: timestamp,
          updatedAt: timestamp,
          metadata: {
            id,
          },
        },
      });

      res.send(brand);
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
