import errorHandler from '@/pages/api/_middlewares/error-handler';
import gpointwallet from '../_lib/gpointwallet';
import { NotFoundError, UnauthenticatedError } from '@/lib/errors';
import { setCookie } from '@/lib/parse-cookies';

export default errorHandler(async function handler(req, res) {
  const method = req.method;

  if (method !== 'post') {
    throw new NotFoundError();
  }

  const { username } = req.body;

  const data = await gpointwallet.getInfoByUsername(username);

  console.log('@pages/api/v1/walletAcct - data: ', data);

  if (!data) throw new UnauthenticatedError('Your credentials are not valid.');

  res.send(data);
});
