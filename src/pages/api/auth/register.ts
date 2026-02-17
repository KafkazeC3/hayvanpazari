import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    if (method === 'POST') {
      const body = req.body;
      const { name, email, phone, password, type, city, district } = body;

      // Validasyon
      if (!name || !email || !phone || !password || !city) {
        return res.status(400).json(
          { error: 'Tüm zorunlu alanları doldurun' }
        );
      }

      // Email kontrolü
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return res.status(400).json(
          { error: 'Bu email adresi zaten kullanımda' }
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

      return res.status(201).json({
        message: 'Kayıt başarılı',
        user
      });
    } else {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Kayıt oluşturulurken bir hata oluştu' });
  }
}
