import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { BadRequestError, NotFoundError } from '@/lib/errors';

export default withApiAuthRequired(
  errorHandler(async function handler(req, res) {
    if (req.method !== 'put' && req.method !== 'get') {
      throw new NotFoundError();
    }

    if (req.method === 'get') {
      const { id } = req.query as any;

      const brand = await prisma.brand.findUnique({
        where: {
          id,
        },
      });

      return res.send(brand);
    }

    if (req.method === 'put') {
      const {
        name,
        slug,
        description,
        thumbnailUrl,
        backgroundUrl,
        available,
        terms,
        categories,
        disclaimer,
        countries,
      } = req.body;
      const { id } = req.query as any;
      const session = getSession(req, res);

      const existingBrand = await prisma.brand.findFirst({
        where: {
          id: {
            not: {
              equals: id,
            },
          },
          slug,
        },
      });

      if (existingBrand) throw new BadRequestError('Slug exits');

      const timestamp = new Date().valueOf();

      const brand = await prisma.brand.update({
        where: {
          id,
        },
        data: {
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
          updatedAt: timestamp,
          metadata: {
            updatedBy: session?.user,
          },
        },
      });

      res.send(brand);
    }
  }),
);
