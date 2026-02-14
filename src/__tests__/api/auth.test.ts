import { POST as registerHandler } from '@/app/api/auth/register/route';
import { NextRequest } from 'next/server';

// Mock Prisma
jest.mock('@/lib/db', () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

import prisma from '@/lib/db';

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          phone: '5551234567',
          city: 'İstanbul',
          password: 'password123',
        }),
      });

      const response = await registerHandler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Kayıt başarılı');
    });

    it('should return error if email already exists', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: '1',
        email: 'test@example.com',
      });

      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          phone: '5551234567',
          city: 'İstanbul',
          password: 'password123',
        }),
      });

      const response = await registerHandler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Bu email zaten kayıtlı');
    });

    it('should return error if required fields are missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: '',
          email: 'test@example.com',
        }),
      });

      const response = await registerHandler(request);
      expect(response.status).toBe(500);
    });
  });
});
