import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // Suppress middleware deprecation warning (will migrate to proxy.ts in future)
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
  // Allow external images from Unsplash
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
