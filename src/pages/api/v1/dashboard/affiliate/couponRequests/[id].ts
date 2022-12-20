import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { BadRequestError, NotFoundError } from '@/lib/errors';

export default errorHandler(async function handler(req, res) {
  if (req.method !== 'put') {
    throw new NotFoundError();
  }

  if (req.method === 'put') {
    const {
      name,
      extendedName,
      currency,
      expiresIn,
      amount,
      sortOrder = 0,
      discountRate = 0,// cashback percent
      notes,
      brandId,
      imageUrl,
      couponImageUrl,
      price,
      country,
      type,
      originalPrice,
      influencerDiscountRate = 0,// cashback for influencer
      customerDiscountRate = 0,// cashback for customer
      influencerId=null,
      categoryIDs,
      slug,
      locale,
      status = 'UNAVAILABLE'
    } = req.body;
    const { id } = req.query as any;
   
    const existingItem = await prisma.item.findUnique({
      where: {
        slug,
      },
    });

    if (existingItem && existingItem?.id !== id)
      throw new BadRequestError('Slug exists');

    const timestamp = new Date().valueOf();

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
        couponImageUrl,
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
        categories: {
          connect: categoryIDs.map((id: string) => ({ id })),
        },
        status,
        updatedAt: timestamp,
        approvalStatus: {
          create: [
            {
              status: 'modifyRequested',
              createdAt: timestamp,
              updatedAt: timestamp
            }
          ]
        }
      },
    });

    res.send(item);
  }
});

