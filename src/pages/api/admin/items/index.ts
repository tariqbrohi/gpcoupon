import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';
import { pick } from 'lodash';
import { NotFoundError } from '@/lib/errors';
import errorHandler from '../../_middlewares/error-handler';

const prisma = new PrismaClient();

export default withApiAuthRequired(
  errorHandler(async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    // console.log(req.method);
    if (req.method !== 'post' && req.method !== 'get') {
      throw new NotFoundError();
    }

    try {
      if (req.method === 'post') {
        const { user } = getSession(req, res) || {};

        const timestamp = +(new Date().valueOf() / 1000).toFixed(0);

        const { brandId, categories: categoryIDs, ...rest } = req.body;
        console.log(`branId = ${brandId}`);
        // const brand = await prisma.brand.findUnique({
        //   where: {
        //     id: brandId,
        //   },
        // });
        console.log(req.body);
        const item = await prisma.item.create({
          data: {
            ...rest,
            status: 'AVAILABLE',
            currency: 'GPT',
            brand: {
              connect: {
                id: brandId,
              },
            },
            categoryIDs,
            redemptionInstructions: '',
            metadata: {
              createdBy: user?.sub,
            },
            createdAt: timestamp,
            updatedAt: timestamp,
          },
        });

        res.send(item);
      }

      if (req.method === 'get') {
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
  }),
);
