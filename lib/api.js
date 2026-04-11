import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Axios instance for all admin API calls.
 *
 * Token strategy:
 *   - The httpOnly `admin_token` cookie (set by /api/auth/login) is used by
 *     Next.js middleware to protect dashboard routes.
 *   - The readable `admin_token_auth` cookie (set on login) is attached as an
 *     Authorization header so the Express backend can verify the admin JWT.
 *
 * On any 401 the user is redirected to /login.
 */
const api = axios.create({
  baseURL: `${BASE_URL}/admin`,
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token before every request
api.interceptors.request.use((config) => {
  const token = Cookies.get('admin_token_auth');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Redirect to /login on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== 'undefined' && error?.response?.status === 401) {
      Cookies.remove('admin_token_auth');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
