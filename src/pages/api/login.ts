import errorHandler from './_middlewares/error-handler';
import login from '@/pages/api/_lib/gpointwallet/login';
import prisma from '@/prisma';
import { ForbiddenError, NotFoundError } from '@/lib/errors';
import { isEmpty } from 'lodash';
import { setLoginSession } from '@/lib/auth/auth';

export default errorHandler(async (req, res) => {
  if (req.method !== 'post') {
    throw new NotFoundError();
  }

  const { username, password } = req.body;
  const { token, user } = await login(username, password);

  if (!token) {
    throw new ForbiddenError();
  }

  setLoginSession(res, {
    token,
    ...user,
  });

  const timestamp = +(new Date().valueOf() / 1000).toFixed(0);

  const _user = await prisma.user.upsert({
    where: {
      provider_providerId: {
        provider: 'gpointwallet',
        providerId: user.id,
      },
    },
    create: {
      provider: 'gpointwallet',
      providerId: user.id,
      username: user.username,
      profileUrl: user.profile.avataUrl,
      email: user.profile.contact?.email,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    update: {
      username: user.username,
      profileUrl: user.profile.avataUrl,
      email: user.profile.contact?.email,
      updatedAt: timestamp,
    },
  });

  res.send(_user);
});
