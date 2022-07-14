import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { NotFoundError, UnauthenticatedError } from '@/lib/errors';
import gpointwallet from '../_lib/gpointwallet';
import { setCookie } from '@/lib/parse-cookies';

export default errorHandler(async function handler(req, res) {
  const method = req.method;

  if (method !== 'post') {
    throw new NotFoundError();
  }

  const { username, password } = req.body;

  const data = await gpointwallet.login(username, password);

  if (!data) throw new UnauthenticatedError('Your credentials are not valid.');

  setCookie(res, [
    { name: 'jid', value: data.token },
    {
      name: 'sess',
      value: Buffer.from(JSON.stringify(data.user)).toString('base64'),
    },
  ]);

  res.send(data.user);
});
