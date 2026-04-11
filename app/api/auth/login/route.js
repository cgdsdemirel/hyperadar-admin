import { NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * POST /api/auth/login
 *
 * Proxies credentials to the Express backend, then sets an httpOnly cookie
 * so middleware can protect dashboard routes.  The token is also returned
 * in the JSON body so api.js can attach it as an Authorization header for
 * subsequent cross-origin backend calls.
 */
export async function POST(request) {
  const { email, password } = await request.json();

  let backendRes;
  try {
    backendRes = await fetch(`${BACKEND}/admin/login`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email, password }),
    });
  } catch {
    return NextResponse.json({ error: 'Cannot reach API server' }, { status: 502 });
  }

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(data, { status: backendRes.status });
  }

  const response = NextResponse.json({ success: true, token: data.token });

  // httpOnly cookie — readable by Next.js middleware, not by client JS
  response.cookies.set('admin_token', data.token, {
    httpOnly: true,
    sameSite: 'strict',
    path:     '/',
    maxAge:   8 * 60 * 60, // 8 hours — matches JWT expiry
    secure:   process.env.NODE_ENV === 'production',
  });

  return response;
}
