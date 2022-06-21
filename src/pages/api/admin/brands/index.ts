import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

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
    if (!req.body.name || !req.body.logo || !req.body.descriptiveImage) {
      return res.status(400).send({
        errors: [
          {
            message: 'Name and image are requried.',
          },
        ],
      });
    }

    if (method === 'post') {
      const existingBrand = await prisma.brand.findFirst({
        where: {
          name: req.body.name,
          slug: req.body.slug,
        },
      });

      if (existingBrand) {
        return res.status(400).send({
          errors: [
            {
              message: 'Duplicate name',
            },
          ],
        });
      }

      const brand = await prisma.brand.create({
        data: req.body,
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
