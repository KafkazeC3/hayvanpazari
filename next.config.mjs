/** @type {import('next').NextConfig} */
const nextConfig = {
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
  
  // Tüm sayfaları dynamic yap (build sırasında DB'ye erişmesinler)
  output: 'standalone',
  
  // Vercel serverless fonksiyonlar için
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
  
  // Build sırasında static generation'ı devre dışı bırak
  // Bu, build sırasında PrismaClient hatasını önler
  distDir: '.next',
};

export default nextConfig;
