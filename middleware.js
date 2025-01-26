import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('dms-token');
  const userId = req.cookies.get('dms-user-id');

  const protectedPaths = ['/dashboard'];

  if (protectedPaths.includes(req.nextUrl.pathname)) {
    if (!token && !userId) {
      return NextResponse.redirect(new URL('account/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard'],
};
