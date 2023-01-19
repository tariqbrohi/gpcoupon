import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import gpointwallet from '../../_lib/gpointwallet';

export default withApiAuthRequired(
  errorHandler(async function handler(req, res) {
    if (req.method !== 'post' && req.method !== 'get') {
      throw new NotFoundError();
    }

    if (req.method === 'post') {
      console.log('req.body: ', req.body);
      const {
        name,
        sub,
        description,
        thumbnailUrl,
        slug,
        disclaimer,
        backgroundUrl,
        available,
        terms,
        categories,
        countries,
        metadata,
      } = req.body;

      const session = getSession(req, res);

      const existingBrand = await prisma.brand.findUnique({
        where: {
          slug,
        },
      });

      if (existingBrand) throw new BadRequestError('Slug exits');

      const timestamp = new Date().valueOf();

      // console.log('sub: ', sub);
      // const walletAcct = await gpointwallet.getInfoByUsername(sub);
      // console.log('walletAcct: ', walletAcct);

      const brand = await prisma.brand.create({
        data: {
          sub,
          name,
          slug,
          description,
          disclaimer,
          thumbnailUrl,
          backgroundUrl,
          status: available ? 'AVAILABLE' : 'UNAVAILABLE',
          terms,
          categories: {
            connect: categories.map((id: string) => ({ id })),
          },
          countries,
          createdAt: timestamp,
          updatedAt: timestamp,
          affiliate: true,
          metadata: {
            ...metadata,
            createdBy: session?.user,
          },
        },
      });

      res.send(brand);
    }
  }),
);
