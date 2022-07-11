import { NextRequest, NextResponse } from 'next/server';

const HOST_NAME = 'sandboxcommerce.io';
// const HOST_NAME = 'localhost:3001';

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3001)
  const hostname = req.headers.get('host') || HOST_NAME;
  const currentHost = hostname
    .replace(`.${HOST_NAME}`, '')
    .replace('.coupon-web.vercel.app', '')
    .replace('.coupon-gimn392dj-gpointwallet.vercel.app', '');
  console.log(
    `current host = ${currentHost} and HOST_NAME=${HOST_NAME} and hostname=${hostname}`,
  );
  console.log(currentHost === HOST_NAME);
  if (url.pathname.startsWith('/images') || url.pathname.startsWith('/api')) {
    return NextResponse.rewrite(url);
  }

  // rewrite for admin pages
  if (currentHost === 'admin') {
    url.pathname = `/admin${url.pathname}`;

    return NextResponse.rewrite(url);
  }

  // rewrite root application to `/home` folder
  if (
    hostname === HOST_NAME ||
    hostname === 'coupon-web.vercel.app' ||
    hostname === 'coupon-gimn392dj-gpointwallet.vercel.app'
  ) {
    console.log(`in here`);
    console.log(url);
    console.log(`what ?? ?? ? ? ? `);
    console.log(`pathname = ${url.pathname}`);
    return NextResponse.rewrite(new URL(`/home${url.pathname}`, url));
  }

  url.pathname = `/_sites/${currentHost}${url.pathname}`;

  return NextResponse.rewrite(url);
}
