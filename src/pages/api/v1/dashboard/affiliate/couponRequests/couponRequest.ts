import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import gpointwallet from '@/pages/api/_lib/gpointwallet';
import convertDateToMs from '@/lib/convertDateToMs';
import { ApproveStatus } from '@prisma/client';

export default errorHandler(async function handler(req, res) {
  if (req.method !== 'post' && req.method !== 'get') {
    throw new NotFoundError();
  }

  const session = gpointwallet.getSession(req);
  if (!session) throw new BadRequestError('No User');

  if (req.method === 'get') {
    const {
      startDate = '',
      endDate = '',
      status = 'ALL',
      requestStatus = 'ALL',
      skip = 0,
      take = 500,
    } = req.query as any;

    if (
      (startDate !== '' && endDate === '') ||
      (startDate === '' && endDate !== '')
    ) {
      throw new BadRequestError('Missing data');
    }

    const where: Record<string, any> = {
      brand: {
        sub: session?.user.username,
      },
      affiliate: true,
    };

    if (startDate !== '' && endDate !== '') {
      where.createdAt = {
        gte: convertDateToMs(startDate),
        lte: convertDateToMs(endDate),
      };
    }

    if (status !== 'ALL') {
      // UNAVAILABLE, AVAILABLE
      where.status = status;
    }

    const whereApprovalStatus: Record<string, any> = {
      // deletedAt: {
      //   isSet: false,
      // },
      some: {
        status: {
          in: ['requested', 'approved', 'rejected', 'modifyRequested'],
        },
      },
    };

    if (requestStatus !== 'ALL') {
      whereApprovalStatus.status = requestStatus;
    }

    where.approvalStatus = whereApprovalStatus;

    const [items, itemsTotal]: any = await Promise.all([
      prisma.item.findMany({
        where,
        take: +take,
        skip: +skip,
        include: {
          approvalStatus: true,
        },
      }),
      // for totalCount
      prisma.item.findMany({
        where,
      }),
    ]);

    return res.send({
      items,
      totalCount: itemsTotal.length,
    });
  }

  if (req.method === 'post') {
    const {
      name,
      extendedName,
      currency,
      expiresIn,
      amount,
      sortOrder = 0,
      discountRate = 0, // cashback percent
      notes,
      brandId,
      imageUrl,
      status = 'UNAVAILABLE',
      couponImageUrl,
      price,
      country,
      type,
      originalPrice,
      influencerDiscountRate = 0, // cashback for influencer
      customerDiscountRate = 0, // cashback for customer
      influencerId = null,
      categoryIDs,
      slug,
      locale,
    } = req.body;

    const createdBy = {
      given_name: session?.user.profile.firstName,
      family_name: session?.user.profile.lastName,
      nickname: session?.user.username,
      name: `${session?.user.profile.firstName} ${session?.user.profile.lastName}`,
      picture: session?.user.profile.avatarUrl,
      locale,
      created_at: new Date().toISOString(),
      email: session?.user.profile.contact.email,
      email_verified: session?.user.confirmed === 0 ? false : true,
      sub: session?.user.id,
      sid: null,
    };

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
        status,
        categories: {
          connect: categoryIDs.map((id: string) => ({ id })),
        },
        createdAt: timestamp,
        updatedAt: timestamp,
        metadata: {
          affiliate: true,
          createdBy,
        },
        approvalStatus: {
          create: {
            status: ApproveStatus.requested,
            createdAt: timestamp,
            updatedAt: timestamp,
          },
        },
      },
      include: {
        approvalStatus: true,
      },
    });

    res.send(item);
  }
});
