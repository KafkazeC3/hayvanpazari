/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  
  trailingSlash: true,
  
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Pages Router için gerekli
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;
