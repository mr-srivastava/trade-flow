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
};

export default nextConfig;
