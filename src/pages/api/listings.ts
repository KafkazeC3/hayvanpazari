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
        status = 'ACTIVE'
      } = req.query;

      // Build filter
      const where: any = {
        status: status as string,
        // isApproved: true, // Test için devre dışı bırakıldı
      };

      if (category) {
        where.category = {
          name: category as string
        };
      }

      if (city) {
        where.city = city as string;
      }

      if (district) {
        where.district = district as string;
      }

      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = parseInt(minPrice as string);
        if (maxPrice) where.price.lte = parseInt(maxPrice as string);
      }

      if (search) {
        where.OR = [
          { title: { contains: search as string, mode: 'insensitive' } },
          { description: { contains: search as string, mode: 'insensitive' } },
        ];
      }

      const listings = await prisma.listing.findMany({
        where,
        include: {
          category: true,
          user: {
            select: {
              id: true,
              name: true,
              phone: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      // Format response
      const formattedListings = listings.map(listing => ({
        id: listing.id,
        title: listing.title,
        description: listing.description,
        price: listing.price,
        city: listing.city,
        district: listing.district,
        category: listing.category?.name || 'Diğer',
        images: JSON.parse(listing.images || '[]'),
        date: listing.createdAt.toISOString().split('T')[0],
        seller: {
          name: listing.user?.name || 'İsimsiz',
          phone: listing.user?.phone || '',
        },
        viewCount: listing.viewCount,
        favoriteCount: listing.favoriteCount,
      }));

      return res.status(200).json({
        listings: formattedListings,
        total: formattedListings.length,
      });
    } catch (error) {
      console.error('Error fetching listings:', error);
      return res.status(500).json({ error: 'İlanlar alınırken hata oluştu' });
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

      // Validation
      if (!title || !description || !price || !city || !district) {
        return res.status(400).json({ 
          error: 'Eksik alanlar var',
          details: { title, description, price, city, district }
        });
      }

      // Check if default category exists
      let finalCategoryId = categoryId;
      if (!finalCategoryId) {
        const defaultCategory = await prisma.category.findFirst();
        if (!defaultCategory) {
          // Create default category if none exists
          const newCategory = await prisma.category.create({
            data: {
              name: 'Diğer',
              slug: 'diger',
              description: 'Diğer kategoriler',
            }
          });
          finalCategoryId = newCategory.id;
        } else {
          finalCategoryId = defaultCategory.id;
        }
      }

      // Check if default user exists
      let finalUserId = userId;
      if (!finalUserId) {
        const defaultUser = await prisma.user.findFirst();
        if (!defaultUser) {
          // Create a default user
          const newUser = await prisma.user.create({
            data: {
              email: 'default@hayvanpazari.com',
              password: 'defaultpassword',
              name: 'İsimsiz Kullanıcı',
              phone: '0000000000',
              city: 'İstanbul',
              district: 'Merkez',
            }
          });
          finalUserId = newUser.id;
        } else {
          finalUserId = defaultUser.id;
        }
      }

      // Create listing
      const listing = await prisma.listing.create({
        data: {
          title,
          description,
          price: parseInt(price),
          city,
          district,
          images: JSON.stringify(images || []),
          categoryId: finalCategoryId,
          userId: finalUserId,
          status: 'PENDING',
          isApproved: false,
        },
        include: {
          category: true,
          user: {
            select: {
              name: true,
              phone: true,
            }
          }
        }
      });

      return res.status(201).json({
        message: 'İlan başarıyla oluşturuldu',
        listing: {
          id: listing.id,
          title: listing.title,
          status: listing.status,
        }
      });
    } catch (error) {
      console.error('Error creating listing:', error);
      return res.status(500).json({ 
        error: 'İlan oluşturulurken hata oluştu',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
