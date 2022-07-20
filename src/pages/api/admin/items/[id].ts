import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { BadRequestError, NotFoundError } from '@/lib/errors';

export default withApiAuthRequired(
  errorHandler(async function handler(req, res) {
    if (req.method !== 'put') {
      throw new NotFoundError();
    }

    if (req.method === 'put') {
      const {
        extendedName,
        currency,
        expiresIn,
        sortOrder = 0,
        discountRate,
        notes,
        brandId,
        imageUrl,
        available,
        country,
        type,
        termsAndConditionsInstructions,
        redemptionInstructions,
        categoryIDs,
        slug,
      } = req.body;
      const { id } = req.query as any;
      const session = getSession(req, res);

      const existingItem = await prisma.item.findFirst({
        where: {
          id: {
            not: {
              equals: id,
            },
          },
          slug,
        },
      });

      if (existingItem) throw new BadRequestError('Slug exits');

      const timestamp = new Date().valueOf();
      console.log(req.body, id);
      const item = await prisma.item.update({
        where: {
          id,
        },
        data: {
          extendedName,
          currency,
          expiresIn: +expiresIn,
          sortOrder: +sortOrder,
          discountRate: +discountRate,
          brand: {
            connect: {
              id: brandId,
            },
          },
          imageUrls: {
            small: imageUrl,
            medium: imageUrl,
            large: imageUrl,
          },
          country,
          type,
          redemptionInstructions: '',
          termsAndConditionsInstructions: '',
          slug,
          status: available ? 'AVAILABLE' : 'UNAVAILABLE',
          categories: {
            connect: categoryIDs.map((id: string) => ({ id })),
          },
          updatedAt: timestamp,
        },
      });

      res.send(item);
    }
  }),
);
