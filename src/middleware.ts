import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Legacy slug with parentheses (and common encodings)
  if (
    pathname === '/marcas/haval/ora-3-(good-cat)' ||
    pathname === '/marcas/haval/ora-3-%28good-cat%29' ||
    decodeURIComponent(pathname) === '/marcas/haval/ora-3-(good-cat)'
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/marcas/haval/ora-3-good-cat';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/marcas/haval/:path*'],
};
