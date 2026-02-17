import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Basit test sorgusu
    const count = await prisma.listing.count();
    const listings = await prisma.listing.findMany({
      take: 5,
      select: {
        id: true,
        title: true,
        price: true,
        city: true,
      }
    });

    return res.status(200).json({
      total: count,
      listings: listings,
      database: 'connected',
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({
      error: 'Database bağlantı hatası',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata',
    });
  }
}
