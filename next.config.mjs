/** @type {import('next').NextConfig} */
const nextConfig = {
  // Temel ayarlar
  images: {
    unoptimized: true,
  },
  
  trailingSlash: true,
  
  // Hata toleransı
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Build timeout
  staticPageGenerationTimeout: 1000,
  
  // React Strict Mode kapalı
  reactStrictMode: false,
  
  // SWC Minify kapalı
  swcMinify: false,
  
  // Experimental kapalı
  experimental: {},
  
  // Webpack config - tüm sayfaları dynamic yap
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
