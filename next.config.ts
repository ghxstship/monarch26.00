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
};

export default nextConfig;
