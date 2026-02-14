// ==========================================
// HOSTINGER STATIC EXPORT CONFIGURATION
// ==========================================

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export için
  output: 'export',
  distDir: 'dist',
  
  // Görseller için
  images: {
    unoptimized: true,
  },
  
  // Trailing slash (SEO dostu URL'ler)
  trailingSlash: true,
  
  // Hostinger'da çalışacak environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  },
  
  // Harici domain'lerden resim yükleme (Cloudinary vb.)
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
