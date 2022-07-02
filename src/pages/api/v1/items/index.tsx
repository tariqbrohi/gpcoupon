import errorHandler from '@/pages/api/_middlewares/error-handler';
import xoxoday from '@/pages/api/_lib/xoxoday';
import { NotFoundError } from '@/lib/errors';

export default errorHandler(async function handler(req, res) {
  const method = req.method;

  if (method !== 'get') {
    throw new NotFoundError();
  }

  const { q, country } = req.query as any;

  if (q) {
    const cats = await xoxoday.getItems({ country, q });

    return res.send(cats);
  }
});
