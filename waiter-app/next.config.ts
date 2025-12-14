import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Allow all Supabase projects
      },
      {
        protocol: 'https',
        hostname: 'tanukifamily.ru', // In case we link directly later
      }
    ],
  },
};

export default nextConfig;
