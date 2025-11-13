/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.scimplify.com',
      },
    ],
  },
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    // optimizePackageImports is still experimental in Next.js 15
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
