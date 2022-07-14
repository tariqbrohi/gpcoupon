import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import xoxoday from '../../_lib/xoxoday';
import { NotFoundError } from '@/lib/errors';

export default errorHandler(async function handler(req, res) {
  const method = req.method;

  if (method !== 'get') {
    throw new NotFoundError();
  }

  const { id, amount } = req.query as any;
  console.log(id, amount, typeof amount, ' hi ~');
  if (amount) {
    const item = await xoxoday.vouchers.findOne({
      itemId: id,
      amount,
    });

    return res.send(item);
  }

  const where: Record<string, any> = { id };

  const item = await prisma.item.findFirst({
    where,
    select: {
      id: true,
      status: true,
      brandId: true,
      categoryIDs: true,
      country: true,
      currency: true,
      createdAt: true,
      updatedAt: true,
      discountRate: true,
      expiresIn: true,
      extendedName: true,
      imageUrls: true,
      name: true,
      amount: true,
      redemptionInstructions: true,
      slug: true,
      termsAndConditionsInstructions: true,
      sortOrder: true,
      type: true,
    },
  });

  res.send(item);
});
