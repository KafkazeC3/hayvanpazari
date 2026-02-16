export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import prisma from '@/lib/db';

// Yeni ilan oluştur
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Giriş yapmalısınız' },
        { status: 401 }
      );
    }

    const body = await req.json();
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
      return NextResponse.json(
        { error: 'Zorunlu alanları doldurun' },
        { status: 400 }
      );
    }

    if (price < 0) {
      return NextResponse.json(
        { error: 'Geçerli bir fiyat girin' },
        { status: 400 }
      );
    }

    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: 'En az bir resim yükleyin' },
        { status: 400 }
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

    // Kategori ilan sayısını güncelle (şema güncellendiğinde aktif edilecek)
    // await prisma.category.update({
    //   where: { id: categoryId },
    //   data: { listingCount: { increment: 1 } },
    // });

    return NextResponse.json({
      success: true,
      listing: {
        id: listing.id,
        title: listing.title,
        status: listing.status,
      },
      message: 'İlanınız başarıyla oluşturuldu ve onay için gönderildi',
    });
  } catch (error) {
    console.error('Listing creation error:', error);
    return NextResponse.json(
      { error: 'İlan oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// İlanları listele (filtreleme ile)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const categoryId = searchParams.get('categoryId');
    const city = searchParams.get('city');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const query = searchParams.get('q');
    const sortBy = searchParams.get('sortBy') || 'newest';

    const where: any = {
      status: 'ACTIVE',
      isApproved: true,
    };

    if (categoryId) where.categoryId = categoryId;
    if (city) where.city = city;
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseInt(minPrice);
      if (maxPrice) where.price.lte = parseInt(maxPrice);
    }
    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ];
    }

    const orderBy: any = {
      newest: { createdAt: 'desc' },
      price_asc: { price: 'asc' },
      price_desc: { price: 'desc' },
      popular: { viewCount: 'desc' },
    }[sortBy] || { createdAt: 'desc' };

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: { select: { name: true, slug: true } },
          user: { select: { name: true, avatar: true, isVerified: true } },
        },
      }),
      prisma.listing.count({ where }),
    ]);

    return NextResponse.json({
      listings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Listings fetch error:', error);
    return NextResponse.json(
      { error: 'İlanlar getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
