import { NextResponse } from 'next/server';

/**
 * Protect all /dashboard/* routes.
 * Reads the httpOnly `admin_token` cookie set by the Next.js login API route.
 * If missing, redirect to /login.
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('admin_token');
    if (!token?.value) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
