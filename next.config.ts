import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/compensair/:path*",
        destination: "https://compensair.vercel.app/compensair/:path*",
      },
      {
        source: "/cc-fyi/:path*",
        destination: "https://cc-fyi.vercel.app/cc-fyi/:path*",
      }
    ];
  },
};

export default nextConfig;
