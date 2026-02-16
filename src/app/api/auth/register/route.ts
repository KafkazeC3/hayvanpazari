export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, password, type, city, district } = body;

    // Validasyon
    if (!name || !email || !phone || !password || !city) {
      return NextResponse.json(
        { error: 'Tüm zorunlu alanları doldurun' },
        { status: 400 }
      );
    }

    // Email kontrolü
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu email adresi zaten kullanımda' },
        { status: 400 }
      );
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kullanıcı oluştur
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        type: type || 'INDIVIDUAL',
        city,
        district: district || '',
        isVerified: false,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        type: true,
        city: true,
        isVerified: true,
      }
    });

    return NextResponse.json(
      { 
        message: 'Kayıt başarılı',
        user 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Kayıt oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
}
