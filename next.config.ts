import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  // reactCompiler: true,
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
