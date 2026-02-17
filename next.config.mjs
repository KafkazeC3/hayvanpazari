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
  
  // SWC Minify kapalı - Babel kullan
  swcMinify: false,
  
  // React Strict Mode kapalı
  reactStrictMode: false,
  
  // Pages Router
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;
