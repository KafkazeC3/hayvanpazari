// Vercel build sırasında PrismaClient oluşturma
// Sadece runtime'da (API route'larında) kullan

import { PrismaClient } from '@prisma/client';

// Build sırasında mock client dön
const isBuild = process.env.NODE_ENV === 'production' && typeof window === 'undefined';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Build sırasında geçici mock client
const mockPrisma = {
  user: { count: async () => 0, findMany: async () => [], findUnique: async () => null },
  listing: { count: async () => 0, findMany: async () => [], findUnique: async () => null },
  category: { findMany: async () => [] },
  setting: { findMany: async () => [] },
} as unknown as PrismaClient;

// Lazy initialization
export const prisma = isBuild 
  ? mockPrisma 
  : (globalForPrisma.prisma ?? new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    }));

if (!isBuild && process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
