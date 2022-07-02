import { IncomingMessage } from 'http';
import { NextApiResponse } from 'next';
import { parse, serialize } from 'cookie';

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

export function parseCookies(req?: IncomingMessage) {
  if (typeof document !== 'undefined') {
    return parse(document.cookie);
  }

  return parse(req?.headers.cookie || '');
}
