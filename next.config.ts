import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-29c79b56b9f44c2a80b005bc022bef94.r2.dev",
      },
    ],
  },
};

export default nextConfig;
