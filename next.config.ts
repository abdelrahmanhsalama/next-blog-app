import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.rockstargames.com",
      },
    ],
  },
};

export default nextConfig;
