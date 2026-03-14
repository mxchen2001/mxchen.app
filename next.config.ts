import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/compensair/:path*",
        destination: "https://compensair.vercel.app/compensair/:path*",
      },
      {
        source: "/compensair/_next/:path*",
        destination: "https://compensair.vercel.app/_next/:path*",
      },
      {
        source: "/cc-fyi/:path*",
        destination: "https://cc-fyi.vercel.app/cc-fyi/:path*",
      },
      {
        source: "/cc-fyi/_next/:path*",
        destination: "https://cc-fyi.vercel.app/_next/:path*",
      },
    ];
  },
};

export default nextConfig;
