import errorHandler from '@/pages/api/_middlewares/error-handler';
import { NotFoundError, UnauthenticatedError } from '@/lib/errors';
import { removeCookie, removeTokenCookie } from '@/lib/auth/auth-cookies';

export default errorHandler(async function handler(req, res) {
  const method = req.method;

  if (method !== 'post') {
    throw new NotFoundError();
  }

  removeTokenCookie(res);
  removeCookie(res, 'sess');

  res.send(true);
});
