import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Tüm hataları yakalayalım
  try {
    // Prisma'yı try-catch içinde import edelim
    let prisma;
    try {
      const prismaModule = await import('@/lib/prisma');
      prisma = prismaModule.prisma;
    } catch (importError: any) {
      return res.status(500).json({
        error: 'Prisma import hatası',
        details: importError?.message || 'Bilinmeyen import hatası'
      });
    }

    if (req.method === 'GET') {
      try {
        console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'TANIMLI' : 'TANIMLI DEĞİL');
        
        const listings = await prisma.listing.findMany({
          orderBy: { createdAt: 'desc' }
        });

        return res.status(200).json({
          listings: listings.map((l: any) => ({
            id: l.id,
            title: l.title,
            description: l.description,
            price: l.price,
            city: l.city,
            district: l.district,
            category: 'Diğer',
            images: JSON.parse(l.images || '[]'),
            date: l.createdAt.toISOString().split('T')[0],
            seller: { name: 'İsimsiz', phone: '' },
          })),
          total: listings.length,
        });
      } catch (dbError: any) {
        console.error('DATABASE ERROR:', dbError);
        return res.status(500).json({ 
          error: 'Database sorgu hatası',
          details: dbError?.message,
          code: dbError?.code,
          meta: dbError?.meta
        });
      }
    }

    if (req.method === 'POST') {
      try {
        const { title, description, price, city, district, images } = req.body;

        const listing = await prisma.listing.create({
          data: {
            title,
            description,
            price: parseInt(price),
            city,
            district,
            images: JSON.stringify(images || []),
            categoryId: '1',
            userId: '1',
            status: 'ACTIVE',
            isApproved: true,
          }
        });

        return res.status(201).json({
          message: 'İlan başarıyla oluşturuldu',
          listing: { id: listing.id, title: listing.title }
        });
      } catch (createError: any) {
        console.error('CREATE ERROR:', createError);
        return res.status(500).json({ 
          error: 'İlan oluşturma hatası',
          details: createError?.message,
          code: createError?.code
        });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (globalError: any) {
    console.error('GLOBAL ERROR:', globalError);
    return res.status(500).json({ 
      error: 'Genel API hatası',
      details: globalError?.message || 'Bilinmeyen hata'
    });
  }
}
