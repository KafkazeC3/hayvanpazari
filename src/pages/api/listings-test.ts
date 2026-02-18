import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Prisma'yı dynamic import edelim (Vercel için)
    const { prisma } = await import('@/lib/prisma');
    
    const count = await prisma.listing.count();
    
    return res.status(200).json({
      success: true,
      total: count,
      message: 'Database bağlantısı başarılı'
    });
  } catch (error: any) {
    console.error('API HATASI:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Database hatası',
      message: error?.message || 'Bilinmeyen hata',
      code: error?.code || 'UNKNOWN'
    });
  }
}
