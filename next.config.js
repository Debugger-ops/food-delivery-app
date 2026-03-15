/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow images from any host
        pathname: "**",
      },
    ],
  },

  // Ensure Turbopack uses the correct workspace root
  experimental: {
    turbo: true,
    turbopack: true,
    turboRoot: __dirname, // <--- ensures Turbopack resolves next/package.json from project root
  },

  reactStrictMode: true, // optional but recommended
};

module.exports = nextConfig;
