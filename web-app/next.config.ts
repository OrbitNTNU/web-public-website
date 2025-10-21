import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.orbitntnu.com", "lh3.googleusercontent.com", "cdn.sanity.io", "images.unsplash.com"],
  },
  reactStrictMode: true,
};

export default nextConfig;
