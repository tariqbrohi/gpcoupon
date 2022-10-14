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
        originalPrice,
        amount,
        influencerDiscountRate = 0,
        influencerId,
        customerDiscountRate = 0,
        price = 0,
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
      // console.log(id);
      const existingItem = await prisma.item.findUnique({
        where: {
          slug,
        },
      });

      if (existingItem && existingItem?.id !== id)
        throw new BadRequestError('Slug exits');

      const timestamp = new Date().valueOf();
      // console.log(influencerDiscountRate, influencerId);
      const item = await prisma.item.update({
        where: {
          id,
        },
        data: {
          extendedName,
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
          price: {
            set: {
              amount: +price,
              currency,
            },
          },
          country,
          amount: +amount,
          influencerDiscountRate: +influencerDiscountRate,
          customerDiscountRate: +customerDiscountRate,
          originalPrice: +originalPrice,
          type,
          redemptionInstructions: '',
          influencerId,
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
