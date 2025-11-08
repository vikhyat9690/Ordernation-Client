import type { NextConfig } from "next";
const serverUrl = process.env.SERVER_URL!;
const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: [serverUrl]
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.01",
        port: "8080",
        pathname: "/images/**"
      }
    ]
  }
};

export default nextConfig;
