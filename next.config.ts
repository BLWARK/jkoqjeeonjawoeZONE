import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "156.67.217.169",
        port: "9001",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.xyzone.media",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
