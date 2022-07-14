import { IncomingMessage } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { parse, serialize } from 'cookie';
import { omit } from 'lodash';

export const setCookie = (
  res: NextApiResponse,
  cookies: { name: string; value: any }[],
) => {
  res.setHeader(
    'Set-Cookie',
    cookies.map((cookie) =>
      serialize(cookie.name, cookie.value, { domain: 'localhost', path: '/' }),
    ),
  );
};

export const removeCookies = (res: NextApiResponse, names: string[]) => {
  res.setHeader(
    'Set-Cookie',
    names.map((name) =>
      serialize(name, '', {
        domain: 'localhost',
        path: '/',
        maxAge: 0,
      }),
    ),
  );
};

export function parseCookies(req?: IncomingMessage) {
  if (typeof document !== 'undefined') {
    return parse(document.cookie);
  }

  return parse(req?.headers.cookie || '');
}
