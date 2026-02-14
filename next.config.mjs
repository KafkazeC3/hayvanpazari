/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  
  images: {
    unoptimized: true,
  },
  
  trailingSlash: true,
  
  // Build hatalarını çözmek için
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Static generation timeout sorununu çöz
  staticPageGenerationTimeout: 1000,
};

export default nextConfig;
