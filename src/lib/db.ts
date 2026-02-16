// Vercel build sırasında PrismaClient oluşturma
// Sadece runtime'da (API route'larında) kullan

import { PrismaClient } from '@prisma/client';

// Build sırasında (DATABASE_URL yoksa) mock client dön
if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL not found, using mock PrismaClient');
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Lazy initialization - sadece ilk kullanımda oluştur
export const prisma = globalForPrisma.prisma ?? 
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
