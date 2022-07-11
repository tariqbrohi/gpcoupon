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
  const hostname = req.headers.get('host') || 'demo.vercel.pub';

  /*  You have to replace ".vercel.pub" with your own domain if you deploy this example under your domain.
      You can also use wildcard subdomains on .vercel.app links that are associated with your Vercel team slug
      in this case, our team slug is "platformize", thus *.platformize.vercel.app works. Do note that you'll
      still need to add "*.platformize.vercel.app" as a wildcard domain on your Vercel dashboard. */
  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname
          .replace(`.vercel.pub`, '')
          .replace(`.platformize.vercel.app`, '')
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

  // rewrite root application to `/home` folder
  if (
    hostname === 'localhost:3001' ||
    hostname === 'coupon-hr1zj8wjw-gpointwallet.vercel.app'
  ) {
    url.pathname = `/home${url.pathname}`;

    return NextResponse.rewrite(url);
  }

  console.log(url.pathname, ' pathnname');
  // rewrite everything else to `/_sites/[site] dynamic route
  // if (!url.pathname.includes('.') && !url.pathname.startsWith('/api')) {

  // }
  url.pathname = `/_sites/${currentHost}${url.pathname}`;

  return NextResponse.rewrite(url);
}
