import errorHandler from '@/pages/api/_middlewares/error-handler';
import { NotFoundError } from '@/lib/errors';
import { removeCookies } from '@/lib/parse-cookies';

export default errorHandler(async function handler(req, res) {
  const method = req.method;

  if (method !== 'post') {
    throw new NotFoundError();
  }

  removeCookies(res, ['jid', 'sess']);

  res.send(true);
});
