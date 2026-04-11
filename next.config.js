/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow Next.js API routes to proxy to the backend on a different port
  async rewrites() {
    return [];
  },
};

module.exports = nextConfig;
