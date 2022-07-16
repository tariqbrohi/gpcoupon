import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { BadRequestError, NotFoundError } from '@/lib/errors';

export default withApiAuthRequired(
  errorHandler(async function handler(req, res) {
    if (req.method !== 'post' && req.method !== 'get') {
      throw new NotFoundError();
    }

    if (req.method === 'post') {
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
      const session = getSession(req, res);

      const existingBrand = await prisma.brand.findUnique({
        where: {
          slug,
        },
      });

      if (existingBrand) throw new BadRequestError('Slug exits');

      const timestamp = new Date().valueOf();

      const brand = await prisma.brand.create({
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
          createdAt: timestamp,
          updatedAt: timestamp,
          metadata: {
            createdBy: session?.user,
          },
        },
      });

      res.send(brand);
    }
  }),
);