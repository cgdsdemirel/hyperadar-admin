import Cookies from 'js-cookie';

/**
 * Authenticate with the admin panel.
 * Calls the Next.js API route which proxies to the backend and sets the
 * httpOnly cookie.
 */
export async function login(email, password) {
  const res = await fetch('/api/auth/login', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Login failed');
  }

  const { token } = await res.json();

  // Readable cookie for Authorization header in api.js
  Cookies.set('admin_token_auth', token, {
    sameSite: 'strict',
    expires:  1 / 3, // 8 hours
  });

  return token;
}

export async function logout() {
  await fetch('/api/auth/logout', { method: 'POST' });
  Cookies.remove('admin_token_auth');
  window.location.href = '/login';
}
