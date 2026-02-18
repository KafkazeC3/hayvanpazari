import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { 
        category, 
        city, 
        district, 
        minPrice, 
        maxPrice, 
        search,
      } = req.query;

      // Build filter - TÜM ilanları getir (test için)
      const where: any = {};

      if (category && category !== '') {
        where.category = {
          name: category as string
        };
      }

      if (city && city !== '') {
        where.city = city as string;
      }

      if (district && district !== '') {
        where.district = district as string;
      }

      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = parseInt(minPrice as string);
        if (maxPrice) where.price.lte = parseInt(maxPrice as string);
      }

      if (search && search !== '') {
        where.OR = [
          { title: { contains: search as string, mode: 'insensitive' } },
          { description: { contains: search as string, mode: 'insensitive' } },
        ];
      }

      console.log('DATABASE QUERY - where:', JSON.stringify(where));

      // Basit sorgu - ilişkiler olmadan
      const listings = await prisma.listing.findMany({
        where,
        orderBy: {
          createdAt: 'desc'
        }
      });

      console.log('DATABASE RESULT - count:', listings.length);

      // Format response
      const formattedListings = listings.map(listing => ({
        id: listing.id,
        title: listing.title,
        description: listing.description,
        price: listing.price,
        city: listing.city,
        district: listing.district,
        category: 'Diğer', // Geçici
        images: JSON.parse(listing.images || '[]'),
        date: listing.createdAt.toISOString().split('T')[0],
        seller: { name: 'İsimsiz', phone: '' }, // Geçici
        viewCount: listing.viewCount,
        favoriteCount: listing.favoriteCount,
      }));

      return res.status(200).json({
        listings: formattedListings,
        total: formattedListings.length,
      });
    } catch (error: any) {
      console.error('DATABASE ERROR:', error);
      return res.status(500).json({ 
        error: 'İlanlar alınırken hata oluştu',
        details: error?.message || 'Bilinmeyen hata',
        code: error?.code || 'UNKNOWN'
      });
    }
  }

  if (req.method === 'POST') {
    try {
      const {
        title,
        description,
        price,
        categoryId,
        city,
        district,
        images,
        userId,
      } = req.body;

      if (!title || !description || !price || !city || !district) {
        return res.status(400).json({ error: 'Eksik alanlar var' });
      }

      const listing = await prisma.listing.create({
        data: {
          title,
          description,
          price: parseInt(price),
          city,
          district,
          images: JSON.stringify(images || []),
          categoryId: categoryId || '1',
          userId: userId || '1',
          status: 'ACTIVE',
          isApproved: true,
        }
      });

      return res.status(201).json({
        message: 'İlan başarıyla oluşturuldu',
        listing: { id: listing.id, title: listing.title }
      });
    } catch (error: any) {
      console.error('CREATE ERROR:', error);
      return res.status(500).json({ 
        error: 'İlan oluşturulurken hata oluştu',
        details: error?.message || 'Bilinmeyen hata'
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
