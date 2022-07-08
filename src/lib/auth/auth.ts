import jwt from 'jsonwebtoken';
import { getTokenCookie, MAX_AGE, setTokenCookie } from './auth-cookies';
import { NextApiRequest, NextApiResponse } from 'next';
import { ForbiddenError } from '../errors';

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'daklsjdlaksjdlkajdla';

export async function setLoginSession(
  res: NextApiResponse,
  payload: Record<string, any>,
) {
  // Create a session object with a max age that we can validate later
  const token = jwt.sign(payload, TOKEN_SECRET, { expiresIn: MAX_AGE });

  setTokenCookie(res, token);
}

export async function getLoginSession(req: NextApiRequest) {
  const token = getTokenCookie(req);

  if (!token) return;

  let payload;

  try {
    payload = jwt.verify(token, TOKEN_SECRET);
  } catch {
    throw new ForbiddenError('Session expired.');
  }

  return payload;
}
