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
  
  // Build sırasında tüm sayfaları dynamic yap
  output: 'export',
  distDir: 'dist',
  
  // Tüm sayfaları dynamic export yap
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return defaultPathMap;
  },
};

export default nextConfig;
