import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isRemovedGuidePath } from '@/lib/removed-guides';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Legacy slug with parentheses (and common encodings)
  if (
    pathname === '/marcas/haval/ora-3-(good-cat)' ||
    pathname === '/marcas/haval/ora-3-%28good-cat%29' ||
    decodeURIComponent(pathname) === '/marcas/haval/ora-3-(good-cat)'
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/marcas/ora/ora-3-good-cat';
    return NextResponse.redirect(url, 308);
  }

  if (isRemovedGuidePath(pathname)) {
    return new NextResponse('Esta página fue retirada.', {
      status: 410,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'x-robots-tag': 'noindex',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/marcas/haval/:path*', '/guias/:path*'],
};
