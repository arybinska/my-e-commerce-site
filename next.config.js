/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["naszsklep-api.vercel.app", "media.graphassets.com"],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
