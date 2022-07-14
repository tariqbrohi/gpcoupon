import { IncomingMessage } from 'http';
import { NextApiResponse } from 'next';
import { parse, serialize } from 'cookie';

const domain =
  process.env.NODE_ENV === 'production' ? '.gpcoupon.com' : 'localhost';

export const setCookie = (
  res: NextApiResponse,
  cookies: { name: string; value: any }[],
) => {
  res.setHeader(
    'Set-Cookie',
    cookies.map((cookie) =>
      serialize(cookie.name, cookie.value, { domain, path: '/' }),
    ),
  );
};

export const removeCookies = (res: NextApiResponse, names: string[]) => {
  res.setHeader(
    'Set-Cookie',
    names.map((name) =>
      serialize(name, '', {
        domain,
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
