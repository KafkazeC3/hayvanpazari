import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Increment view count
    await prisma.listing.update({
      where: { id: id as string },
      data: { viewCount: { increment: 1 } }
    });

    const listing = await prisma.listing.findUnique({
      where: { id: id as string },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
            city: true,
          }
        }
      }
    });

    if (!listing) {
      return res.status(404).json({ error: 'İlan bulunamadı' });
    }

    // Format response
    const formattedListing = {
      id: listing.id,
      title: listing.title,
      description: listing.description,
      price: listing.price,
      city: listing.city,
      district: listing.district,
      fullAddress: listing.fullAddress,
      category: listing.category?.name || 'Diğer',
      images: JSON.parse(listing.images || '[]'),
      date: listing.createdAt.toISOString().split('T')[0],
      seller: {
        name: listing.user?.name || 'İsimsiz',
        phone: listing.user?.phone || '',
        city: listing.user?.city || '',
      },
      viewCount: listing.viewCount,
      favoriteCount: listing.favoriteCount,
      status: listing.status,
      isApproved: listing.isApproved,
    };

    return res.status(200).json(formattedListing);
  } catch (error) {
    console.error('Error fetching listing:', error);
    return res.status(500).json({ error: 'İlan alınırken hata oluştu' });
  }
}
