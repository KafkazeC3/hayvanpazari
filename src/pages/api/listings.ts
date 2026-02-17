import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    if (method === 'GET') {
      const { page = '1', limit = '20', categoryId, city, minPrice, maxPrice, q, sortBy = 'newest' } = req.query;
      
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);

      const where: any = {
        status: 'ACTIVE',
        isApproved: true,
      };

      if (categoryId) where.categoryId = categoryId as string;
      if (city) where.city = city as string;
      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = parseInt(minPrice as string);
        if (maxPrice) where.price.lte = parseInt(maxPrice as string);
      }
      if (q) {
        where.OR = [
          { title: { contains: q as string, mode: 'insensitive' } },
          { description: { contains: q as string, mode: 'insensitive' } },
        ];
      }

      const orderBy: any = {
        newest: { createdAt: 'desc' },
        price_asc: { price: 'asc' },
        price_desc: { price: 'desc' },
        popular: { viewCount: 'desc' },
      }[sortBy as string] || { createdAt: 'desc' };

      const [listings, total] = await Promise.all([
        prisma.listing.findMany({
          where,
          orderBy,
          skip: (pageNum - 1) * limitNum,
          take: limitNum,
          include: {
            category: { select: { name: true, slug: true } },
            user: { select: { name: true, avatar: true, isVerified: true } },
          },
        }),
        prisma.listing.count({ where }),
      ]);

      return res.status(200).json({
        listings,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      });
    } else if (method === 'POST') {
      const session = await getServerSession(req, res, authOptions);

      if (!session?.user?.id) {
        return res.status(401).json(
          { error: 'Giriş yapmalısınız' }
        );
      }

      const body = req.body;
      const {
        title,
        description,
        price,
        categoryId,
        subcategoryId,
        city,
        district,
        images,
        features,
        phone,
      } = body;

      // Validasyon
      if (!title || !description || !price || !categoryId || !city) {
        return res.status(400).json(
          { error: 'Zorunlu alanları doldurun' }
        );
      }

      if (price < 0) {
        return res.status(400).json(
          { error: 'Geçerli bir fiyat girin' }
        );
      }

      if (!images || images.length === 0) {
        return res.status(400).json(
          { error: 'En az bir resim yükleyin' }
        );
      }

      // İlan oluştur
      const listing = await prisma.listing.create({
        data: {
          title,
          description,
          price: Math.round(price),
          currency: 'TRY',
          categoryId,
          subcategoryId: subcategoryId || null,
          city,
          district: district || '',
          images: JSON.stringify(images),
          userId: session.user.id,
          status: 'PENDING',
          isApproved: false,
        },
      });

      return res.status(201).json({
        success: true,
        listing: {
          id: listing.id,
          title: listing.title,
          status: listing.status,
        },
        message: 'İlanınız başarıyla oluşturuldu ve onay için gönderildi',
      });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
