import { NextRequest, NextResponse } from 'next/server';

// const HOST_NAME = 'grapherjs.ngrok.io';
const HOST_NAME = 'sandboxcommerce.io';

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
  const currentHost = hostname.replace(`.${HOST_NAME}`, '');

  if (url.pathname.startsWith(`/_sites`)) {
    return new Response(null, { status: 404 });
  }

  if (url.pathname.startsWith('/images') || url.pathname.startsWith('/api')) {
    return NextResponse.rewrite(url);
  }

  // rewrite for admin pages
  if (currentHost === 'admin') {
    url.pathname = `/admin${url.pathname}`;

    return NextResponse.rewrite(url);
  }

  // rewrite root application to `/home` folder
  if (hostname === HOST_NAME) {
    url.pathname = `/home${url.pathname}`;

    return NextResponse.rewrite(url);
  }

  url.pathname = `/_sites/${currentHost}${url.pathname}`;

  return NextResponse.rewrite(url);
}
