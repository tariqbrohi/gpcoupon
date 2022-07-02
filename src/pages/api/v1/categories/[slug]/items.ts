import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import xoxoday from '@/pages/api/_lib/xoxoday';
import { NotFoundError } from '@/lib/errors';

export default errorHandler(async function handler(req, res) {
  const method = req.method;

  if (method !== 'get') {
    throw new NotFoundError();
  }

  const { country, slug } = req.query as any;

  if (country && slug) {
    const [items, xoxoItems] = await Promise.all([
      prisma.item.findMany({
        where: {
          category: slug,
          country,
        },
      }),
      xoxoday.getItems({ catSlug: slug, country }),
    ]);

    res.send([
      ...items.map(
        ({
          id,
          name,
          amount,
          discountRate,
          description,
          expiresIn,
          imageUrl,
        }) => ({
          id,
          name,
          amount,
          discount: discountRate,
          description,
          expiry: expiresIn,
          image: {
            medium: imageUrl,
          },
        }),
      ),
      ...xoxoItems,
    ]);

    // const [items, xoxoItems] = await Promise.all([
    //   prisma.item.findMany({
    //     where: {
    //       category: slug,
    //       country,
    //     },
    //   }),

    // ]);
    // console.log(items, '  here you go');
    // return res.send([...xoxoItems]);
  }
});
