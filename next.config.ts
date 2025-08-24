/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Don't block production builds because of ESLint errors
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
