import { NextResponse } from 'next/server';

/**
 * Protect all /dashboard/* routes.
 * Reads the httpOnly `admin_token` cookie set by the Next.js login API route.
 * If missing, redirect to /login.
 *
 * Also keeps `admin_token_auth` (the readable cookie used by api.js for the
 * Authorization header) in sync with `admin_token`. If a 401 interceptor or
 * cookie expiry clears `admin_token_auth` while `admin_token` is still valid,
 * this re-derives it so the next API call succeeds without sending the user
 * back to the login page.
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('admin_token');
    if (!token?.value) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Re-sync the readable auth cookie if it went missing.
    const authCookie = request.cookies.get('admin_token_auth');
    if (!authCookie?.value) {
      const response = NextResponse.next();
      response.cookies.set('admin_token_auth', token.value, {
        sameSite: 'strict',
        path:     '/',
        maxAge:   8 * 60 * 60,
        secure:   process.env.NODE_ENV === 'production',
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
