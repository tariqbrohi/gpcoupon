import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';
import { pick } from 'lodash';

const prisma = new PrismaClient();

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method?.toLowerCase();

  if (method !== 'post' && method !== 'get') {
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

      const brand = await prisma.brand.findUnique({
        where: {
          slug: req.body.brand,
        },
      });

      const item = await prisma.item.create({
        data: {
          ...req.body,
          display: true,
          createdBy: user?.sub,
          state: 'AVAILABLE',
          type: 'GIFT_CARD',
          meta: {
            brand: pick(brand, ['logo', 'name']),
          },
          notes: [
            {
              text: 'Send via Link share / Email',
            },
          ],
        },
      });

      res.send(item);
    }

    if (method === 'get') {
      const { brand, category, name, country } = req.query as any;

      const params: any = {};

      if (brand) {
        params.brand = brand;
      }

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = name;
      }

      if (country) {
        params.country = country;
      }

      const items = await prisma.item.findMany({
        where: params,
      });

      res.send(items);
    }
  } catch (err: any) {
    console.log(err);
    res.status(err?.statusCode || 500).send({
      errors: [
        {
          message: err?.message || 'Something went wrong.',
        },
      ],
    });
  }
});
