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
  // Enable SWC minification for better optimization
  swcMinify: true,
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Experimental features for better optimization
  experimental: {
    // This can help with bundle optimization
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
