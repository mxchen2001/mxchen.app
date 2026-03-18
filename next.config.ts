import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/compensair/:path*",
        destination: "https://compensair.vercel.app/:path*",
      },
      {
        source: "/compensair/_next/:path*",
        destination: "https://compensair.vercel.app/_next/:path*",
      },
      {
        source: "/cc-fyi/:path*",
        destination: "https://cc-fyi.vercel.app/:path*",
      },
      {
        source: "/cc-fyi/_next/:path*",
        destination: "https://cc-fyi.vercel.app/_next/:path*",
      },
      {
        source: "/reresume/:path*",
        destination: "https://reresume-beta.vercel.app/:path*",
      },
      {
        source: "/reresume/_next/:path*",
        destination: "https://reresume-beta.vercel.app/_next/:path*",
      },
    ];
  },
};

export default nextConfig;
