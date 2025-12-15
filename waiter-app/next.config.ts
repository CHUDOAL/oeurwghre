
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'tanukifamily.ru',
      },
      {
        protocol: 'https',
        hostname: 'kcdn.tanuki.ru',
      }
    ],
  },
};

export default nextConfig;
