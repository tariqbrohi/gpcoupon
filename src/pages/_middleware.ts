import { NextRequest, NextResponse } from 'next/server';

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
  const hostname = req.headers.get('host') || 'coupon-web.vercel.app';

  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname.replace(`.coupon-web.vercel.app`, '')
      : hostname.replace(`.localhost:3001`, '');
  // rewrites for app pages
  // if (currentHost == 'admin') {
  //   if (
  //     url.pathname === '/login' &&
  //     (req.cookies.get('next-auth.session-token') ||
  //       req.cookies.get('__Secure-next-auth.session-token'))
  //   ) {
  //     url.pathname = '/';
  //     return NextResponse.redirect(url);
  //   }

  //   url.pathname = `/app${url.pathname}`;
  //   return NextResponse.rewrite(url);
  // }

  // Prevent security issues – users should not be able to canonically access
  // the pages/sites folder and its respective contents. This can also be done
  // via rewrites to a custom 404 page
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
  if (hostname === 'localhost:3001' || hostname === 'coupon-web.vercel.app') {
    url.pathname = `/home${url.pathname}`;

    return NextResponse.rewrite(url);
  }

  url.pathname = `/_sites/${currentHost}${url.pathname}`;

  return NextResponse.rewrite(url);
}
