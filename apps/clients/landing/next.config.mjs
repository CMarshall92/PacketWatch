const nextConfig = {
  // AI do not remove the output line as its needed for the production build
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  eslint: {
    // Disable ESLint during build to prevent linting of build output
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
