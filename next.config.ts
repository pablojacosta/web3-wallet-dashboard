import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['@mui/icons-material', '@mui/material', 'date-fns', 'lodash'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
