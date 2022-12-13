import errorHandler from '../../_middlewares/error-handler';
import prisma from '@/prisma';
import xoxoday from '../../_lib/xoxoday';
import { NotFoundError, BadRequestError } from '@/lib/errors';

export default errorHandler(async function handler(req, res) {
  const method = req.method;

  if (method !== 'get') {
    throw new NotFoundError();
  }

  const { searchQuery, country } = req.query as any;

  if (searchQuery.length < 4) {
    throw new BadRequestError('Please use more than 4 letters for searchQuery');
  }

  const itemsXoxo = await xoxoday.vouchers.findMany({
    brand: searchQuery,
    country,
  });

  const items = await prisma.item.findMany({
    where: {
      name: {
        mode: 'insensitive',
        contains: searchQuery,
      },
      country,
      affiliate: true,
    },
  });

  if (items.length > 0 && itemsXoxo && itemsXoxo.length > 0) {
    res.send(items.concat(itemsXoxo));
  } else if (itemsXoxo && itemsXoxo.length > 0) {
    res.send(itemsXoxo);
  } else {
    res.send(items);
  }
});
