import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

async function main() {
  console.log('🌱 Seeding database...');
  console.log('Database URL:', process.env.DATABASE_URL);

  // Kategorileri oluştur
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'buyukbas-hayvanlar' },
      update: {},
      create: {
        name: 'Büyükbaş Hayvanlar',
        slug: 'buyukbas-hayvanlar',
        description: 'İnek, düve, tosun, dana ve diğer büyükbaş hayvanlar',
        icon: 'Cow',
        image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&q=80',
        order: 1,
        subcategories: {
          create: [
            { name: 'İnek', slug: 'inek' },
            { name: 'Düve', slug: 'duve' },
            { name: 'Tosun', slug: 'tosun' },
            { name: 'Dana', slug: 'dana' },
          ],
        },
      },
    }),
    prisma.category.upsert({
      where: { slug: 'kucukbas-hayvanlar' },
      update: {},
      create: {
        name: 'Küçükbaş Hayvanlar',
        slug: 'kucukbas-hayvanlar',
        description: 'Koyun, keçi ve diğer küçükbaş hayvanlar',
        icon: 'Sheep',
        image: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=800&q=80',
        order: 2,
        subcategories: {
          create: [
            { name: 'Koyun', slug: 'koyun' },
            { name: 'Keçi', slug: 'keci' },
            { name: 'Kuzu', slug: 'kuzu' },
          ],
        },
      },
    }),
    prisma.category.upsert({
      where: { slug: 'yem-saman' },
      update: {},
      create: {
        name: 'Yem & Saman',
        slug: 'yem-saman',
        description: 'Yem, saman, ot ve besin takviyeleri',
        icon: 'Wheat',
        image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80',
        order: 3,
        subcategories: {
          create: [
            { name: 'Saman', slug: 'saman' },
            { name: 'Yonca', slug: 'yonca' },
            { name: 'Yem', slug: 'yem' },
          ],
        },
      },
    }),
    prisma.category.upsert({
      where: { slug: 'ciftlik-malzemeleri' },
      update: {},
      create: {
        name: 'Çiftlik Malzemeleri',
        slug: 'ciftlik-malzemeleri',
        description: 'Süt sağım makinesi, yemlik, suluk ve diğer ekipmanlar',
        icon: 'Tractor',
        image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80',
        order: 4,
        subcategories: {
          create: [
            { name: 'Süt Sağım', slug: 'sut-sagim' },
            { name: 'Yemlik', slug: 'yemlik' },
            { name: 'Suluk', slug: 'suluk' },
          ],
        },
      },
    }),
  ]);

  console.log(`✅ ${categories.length} kategori oluşturuldu`);

  // Admin kullanıcısı oluştur
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@hayvanpazari.com' },
    update: {},
    create: {
      email: 'admin@hayvanpazari.com',
      password: adminPassword,
      name: 'Sistem Yöneticisi',
      phone: '08501234567',
      type: 'BUSINESS',
      city: 'Konya',
      district: 'Selçuklu',
      isAdmin: true,
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    },
  });

  console.log('✅ Admin kullanıcısı oluşturuldu:', admin.email);

  // Test kullanıcıları oluştur
  const userPassword = await bcrypt.hash('user123', 10);
  
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'ahmet@email.com' },
      update: {},
      create: {
        email: 'ahmet@email.com',
        password: userPassword,
        name: 'Ahmet Yılmaz',
        phone: '05321234567',
        type: 'BUSINESS',
        city: 'Konya',
        district: 'Selçuklu',
        isVerified: true,
        rating: 4.8,
        reviewCount: 56,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      },
    }),
    prisma.user.upsert({
      where: { email: 'mehmet@email.com' },
      update: {},
      create: {
        email: 'mehmet@email.com',
        password: userPassword,
        name: 'Mehmet Kaya',
        phone: '05439876543',
        type: 'INDIVIDUAL',
        city: 'Ankara',
        district: 'Polatlı',
        isVerified: true,
        rating: 4.5,
        reviewCount: 23,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
      },
    }),
    prisma.user.upsert({
      where: { email: 'ayse@email.com' },
      update: {},
      create: {
        email: 'ayse@email.com',
        password: userPassword,
        name: 'Ayşe Demir',
        phone: '05554567890',
        type: 'BUSINESS',
        city: 'Kayseri',
        district: 'Melikgazi',
        isVerified: true,
        rating: 4.9,
        reviewCount: 89,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      },
    }),
  ]);

  console.log(`✅ ${users.length} test kullanıcısı oluşturuldu`);

  // Örnek ilanlar oluştur
  const [category1, category2, category3, category4] = categories;
  const subcategories1 = await prisma.subcategory.findMany({ where: { categoryId: category1.id } });
  const subcategories2 = await prisma.subcategory.findMany({ where: { categoryId: category2.id } });
  const [user1, user2, user3] = users;

  const listings = await Promise.all([
    prisma.listing.create({
      data: {
        title: 'Holstein Süt İneği - 4 Yaşında',
        description: '4 yaşında, sağlıklı, günlük 25-30 litre süt veren Holstein ırkı ineğimizi satıyoruz.',
        price: 45000,
        currency: 'TRY',
        categoryId: category1.id,
        subcategoryId: subcategories1[0]?.id,
        city: 'Konya',
        district: 'Selçuklu',
        images: JSON.stringify(['https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&q=80']),
        status: 'ACTIVE',
        isApproved: true,
        userId: user1.id,
        features: {
          create: [
            { key: 'yas', label: 'Yaş', value: '4' },
            { key: 'irk', label: 'Irk', value: 'Holstein' },
          ],
        },
      },
    }),
    prisma.listing.create({
      data: {
        title: 'Simental Düve - 2 Yaşında',
        description: '2 yaşında, gebe Simental düve. İlk gebeliğinde, sağlık raporu mevcut.',
        price: 38000,
        currency: 'TRY',
        categoryId: category1.id,
        subcategoryId: subcategories1[1]?.id,
        city: 'Ankara',
        district: 'Polatlı',
        images: JSON.stringify(['https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=800&q=80']),
        status: 'ACTIVE',
        isApproved: true,
        userId: user2.id,
        features: {
          create: [
            { key: 'yas', label: 'Yaş', value: '2' },
            { key: 'irk', label: 'Irk', value: 'Simental' },
          ],
        },
      },
    }),
  ]);

  console.log(`✅ ${listings.length} örnek ilan oluşturuldu`);
  console.log('\n🎉 Database seeding tamamlandı!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding hatası:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
