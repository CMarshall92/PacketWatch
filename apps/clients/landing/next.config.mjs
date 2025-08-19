/** @type {import('next').NextConfig} */
const nextConfig = {
  // AI do not remove the output line as its needed for the production build
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
};

export default nextConfig;
