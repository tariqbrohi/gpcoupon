import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import { ApproveStatus } from '@prisma/client';

export default withApiAuthRequired(
  errorHandler(async function handler(req, res) {
    if (req.method !== 'put') {
      throw new NotFoundError();
    }

    if (req.method === 'put') {
      const {
        name,
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
        couponImageUrl,
        available,
        country,
        type,
        termsAndConditionsInstructions,
        redemptionInstructions,
        categoryIDs,
        slug,
        approvalStatus,
      } = req.body;

      const { id } = req.query as any;
      const session = getSession(req, res);
      // console.log('-----------------------------------------------');
      // console.log('@api/admin/items/:id - req.method: ', req.method);
      // console.log('@api/admin/items/id - req.body: ', req.body);
      // console.log('@api/admin/items/id - available: ', available);
      // console.log('@api/admin/items/id - approvalStatus: ', approvalStatus);
      // console.log('@api/admin/items/id - currency: ', currency);
      // console.log('@api/admin/items/:id - session---: ', session);
      // console.log('@api/admin/items/:id - req.query id: ', id);

      const existingItem = await prisma.item.findUnique({
        where: {
          slug,
        },
      });

      if (existingItem && existingItem?.id !== id)
        throw new BadRequestError('Slug exits');

      const timestamp = new Date().valueOf();
      // console.log(influencerDiscountRate, influencerId);
      if (currency) {
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
      } else {
        const item = await prisma.item.update({
          where: {
            id,
          },
          data: {
            name,
            extendedName,
            expiresIn: +expiresIn,
            sortOrder: +sortOrder,
            discountRate: +discountRate,
            brand: {
              connect: {
                id: brandId,
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
            approvalStatus: {
              create: {
                status: approvalStatus.status,
                message: approvalStatus.message,
                approver: { adminInfo: session?.user },
                createdAt: timestamp,
                updatedAt: timestamp,
              },
            },
          },
        });
        res.send(item);
      }
    }
  }),
);
