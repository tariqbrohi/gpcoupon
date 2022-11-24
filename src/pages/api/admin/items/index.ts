import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { BadRequestError, NotFoundError } from '@/lib/errors';

export default withApiAuthRequired(
  errorHandler(async function handler(req, res) {
    if (req.method !== 'post' && req.method !== 'get') {
      throw new NotFoundError();
    }

    if (req.method === 'get') {
      const {} = req.query as any;

      const items = (await prisma.item.findRaw({
        filter: { 'metadata.affiliate': { $eq: true } },
      })) as unknown as any;

      return res.send(
        items.map(({ _id, categoryIDs, brandId, ...rest }: any) => ({
          ...rest,
          id: _id['$oid'],
          brandId: brandId?.['$oid'],
          categoryIDs: categoryIDs.map(({ $oid }: any) => $oid),
        })),
      );
    }

    if (req.method === 'post') {
      const {
        name,
        extendedName,
        currency,
        expiresIn,
        amount,
        sortOrder = 0,
        discountRate,
        notes,
        brandId,
        imageUrl,
        available,
        couponImageUrl,
        price,
        country,
        type,
        originalPrice,
        influencerDiscountRate = 0,
        customerDiscountRate = 0,
        influencerId,
        termsAndConditionsInstructions,
        redemptionInstructions,
        categoryIDs,
        slug,
      } = req.body;
      const session = getSession(req, res);

      const existingItem = await prisma.item.findUnique({
        where: {
          slug,
        },
      });

      if (existingItem) throw new BadRequestError('Slug exits');

      const timestamp = new Date().valueOf();

      const item = await prisma.item.create({
        data: {
          name,
          extendedName,
          originalPrice: +originalPrice,
          affiliate: true,
          influencerDiscountRate: +influencerDiscountRate,
          customerDiscountRate: +customerDiscountRate,
          influencerId,
          expiresIn: +expiresIn,
          sortOrder: +sortOrder,
          amount: +amount,
          price: {
            set: {
              amount: +price,
              currency,
            },
          },
          discountRate: +discountRate,
          brand: {
            connect: {
              id: brandId,
            },
          },
          couponImageUrl,
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
          createdAt: timestamp,
          updatedAt: timestamp,
          metadata: {
            affiliate: true,
            createdBy: session?.user,
          },
        },
      });

      res.send(item);
    }
  }),
);
