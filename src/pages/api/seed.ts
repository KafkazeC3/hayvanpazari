import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if data already exists
    const existingCategories = await prisma.category.count();
    const existingUsers = await prisma.user.count();

    if (existingCategories > 0 && existingUsers > 0) {
      return res.status(200).json({ 
        message: 'Database zaten dolu',
        categories: existingCategories,
        users: existingUsers
      });
    }

    // Create default categories
    const categories = [
      { name: 'Büyükbaş Hayvanlar', slug: 'buyukbas-hayvanlar', description: 'İnek, dana, boğa ilanları' },
      { name: 'Küçükbaş Hayvanlar', slug: 'kucukbas-hayvanlar', description: 'Koyun, keçi ilanları' },
      { name: 'Kanatlı Hayvanlar', slug: 'kanatli-hayvanlar', description: 'Tavuk, hindi, ördek ilanları' },
      { name: 'Atlar', slug: 'atlar', description: 'At ilanları' },
      { name: 'Evcil Hayvanlar', slug: 'evcil-hayvanlar', description: 'Köpek, kedi ilanları' },
      { name: 'Hayvan Gıdaları', slug: 'hayvan-gidalari', description: 'Yem, mama ilanları' },
      { name: 'Ekipmanlar', slug: 'ekipmanlar', description: 'Çiftlik ekipmanları' },
      { name: 'Diğer', slug: 'diger', description: 'Diğer ilanlar' },
    ];

    for (const cat of categories) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: {
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          order: 0,
          isActive: true,
        }
      });
    }

    // Create default user
    await prisma.user.upsert({
      where: { email: 'default@hayvanpazari.com' },
      update: {},
      create: {
        email: 'default@hayvanpazari.com',
        password: 'defaultpassword123',
        name: 'Varsayılan Kullanıcı',
        phone: '05551234567',
        city: 'İstanbul',
        district: 'Kadıköy',
        isVerified: true,
        isActive: true,
        isAdmin: false,
      }
    });

    return res.status(200).json({ 
      message: 'Database başarıyla dolduruldu',
      categories: categories.length,
      users: 1
    });

  } catch (error) {
    console.error('Seed error:', error);
    return res.status(500).json({ 
      error: 'Database doldurulurken hata oluştu',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    });
  }
}
