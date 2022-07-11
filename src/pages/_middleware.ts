import { NextRequest, NextResponse } from 'next/server';

// const HOST_NAME = 'grapherjs.ngrok.io';
const HOST_NAME = 'localhost:3001';

export const config = {
  matcher: [
    '/',
    '/([^/.]*)', // exclude `/public` files by matching all paths except for paths containing `.` (e.g. /logo.png)
    '/site/:path*',
    '/post/:path*',
    '/_sites/:path*',
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3001)
  const hostname = req.headers.get('host') || HOST_NAME;
  const currentHost = hostname
    .replace(`.${HOST_NAME}`, '')
    .replace('.coupon-web.vercel.app', '')
    .replace('.coupon-gimn392dj-gpointwallet.vercel.app', '');
  console.log(`current host = ${currentHost}`);
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
    currentHost === 'coupon-web.vercel.app' ||
    currentHost === 'coupon-gimn392dj-gpointwallet.vercel.app'
  ) {
    url.pathname = `/home${url.pathname}`;

    return NextResponse.rewrite(url);
  }

  url.pathname = `/_sites/${currentHost}${url.pathname}`;

  return NextResponse.rewrite(url);
}
