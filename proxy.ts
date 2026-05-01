import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/scrapbook/unlock')) return NextResponse.next();

  const session = request.cookies.get('scrapbook_session');
  if (session?.value !== 'unlocked') {
    return NextResponse.redirect(new URL('/scrapbook/unlock', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/scrapbook', '/scrapbook/:path*'],
};
