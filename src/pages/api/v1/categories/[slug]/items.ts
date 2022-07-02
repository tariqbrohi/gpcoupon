import errorHandler from '@/pages/api/_middlewares/error-handler';
import xoxoday from '@/pages/api/_lib/xoxoday';
import { NotFoundError } from '@/lib/errors';

export default errorHandler(async function handler(req, res) {
  const method = req.method;

  if (method !== 'get') {
    throw new NotFoundError();
  }

  const { country, slug } = req.query as any;

  if (country && slug) {
    const items = await xoxoday.getItems({ catSlug: slug, country });

    return res.send(items);
  }
});
