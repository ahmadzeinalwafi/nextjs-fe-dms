import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('access-token');

  const protectedPaths = ['/dashboard'];

  if (protectedPaths.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL('account/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard'],
};
