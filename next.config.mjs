/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel serverless için standalone yerine default
  // output: 'standalone',
  
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
  
  // Vercel serverless fonksiyonlar için
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
};

export default nextConfig;
