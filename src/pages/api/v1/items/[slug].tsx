import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import xoxoday from '../../_lib/xoxoday';
import { Item } from '@prisma/client';
import { NotFoundError } from '@/lib/errors';

export default errorHandler(async function handler(req, res) {
  const method = req.method;

  if (method !== 'get') {
    throw new NotFoundError();
  }

  const slug = (req.query as any).slug.split('-');
  const amount = slug.pop();
  const itemId = slug.pop();

  let item: Item | null = null;

  if (!isNaN(itemId)) {
    item = await xoxoday.vouchers.findOne({
      itemId,
      amount,
    });

    return res.send(item);
  } else {
    item = await prisma.item.findFirst({
      where: {
        slug,
      },
    });
  }

  res.send(item);
});
