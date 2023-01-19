import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import { ApproveStatus } from '@prisma/client';

export default withApiAuthRequired(
  errorHandler(async function handler(req, res) {
    if (req.method !== 'post' && req.method !== 'get') {
      throw new NotFoundError();
    }

    if (req.method === 'get') {
      const {} = req.query as any;

      const items = (await prisma.item.findMany({
        where: {
          affiliate: true,
          approvalStatus: {
            some: {
              status: {
                // equals: 'requested',
                in: ['requested', 'approved', 'rejected', 'modifyRequested'],
              },
            },
          },
        },
        include: {
          approvalStatus: true,
          brand: true,
        },
      })) as unknown as any;

      // console.log('@ api/admin/items - getgetgetgetget items: ', items);

      return res.send(items);

      // const temp = items.map(({ _id, categoryIDs, brandId, ...rest }: any) => ({
      //   ...rest,
      //   id: _id['$oid'],
      //   brandId: brandId?.['$oid'],
      //   categoryIDs: categoryIDs.map(({ $oid }: any) => $oid),
      // }));

      // console.log('@ api/admin/items - temp: ', temp);

      // return res.send(
      //   items.map(({ _id, categoryIDs, brandId, ...rest }: any) => ({
      //     ...rest,
      //     id: _id['$oid'],
      //     brandId: brandId?.['$oid'],
      //     categoryIDs: categoryIDs.map(({ $oid }: any) => $oid),
      //   })),
      // );
    }

    // console.log('req.body: ', req.body);

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
        approvalStatus,
      } = req.body;

      // console.log('approvalStatus: ', approvalStatus);
      const session = getSession(req, res);

      // console.log('@page/api/admin/items - session:===============> ', session);
      // console.log('session?.user.sub: ', session?.user.sub);
      // console.log('currency: ', currency);

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
          approvalStatus: {
            create: {
              status: ApproveStatus.approved,
              approver: { adminInfo: session?.user },
              createdAt: timestamp,
              updatedAt: timestamp,
            },
          },
        },
        include: {
          approvalStatus: true,
        },
      });

      // console.log('@api/admin/items/index - created item: =====', item);

      res.send(item);
    }
  }),
);
