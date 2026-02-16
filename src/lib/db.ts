import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// PrismaClient'ı lazy initialization ile oluştur
// Build sırasında DB'ye bağlanmaya çalışmasın
function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }
  
  // Production'da (Vercel) her zaman yeni instance oluştur
  // Development'ta global'de sakla
  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
  
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = client;
  }
  
  return client;
}

// Lazy export - ilk kullanımda oluşturulur
export const prisma = globalForPrisma.prisma ?? getPrismaClient();

export default prisma;
