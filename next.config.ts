import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  images: {
    domains: ["https://vvcxzdptjvquqfaaxxhr.supabase.co"],
  },
};

export default nextConfig;
