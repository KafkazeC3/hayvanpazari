import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    if (method === 'GET') {
      const categories = await prisma.category.findMany({
        orderBy: { order: 'asc' },
        include: {
          subcategories: {
            select: { id: true, name: true, slug: true }
          },
          _count: {
            select: { listings: true, subcategories: true }
          }
        }
      });

      return res.status(200).json({ categories });
    } else {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ error: 'Failed to fetch categories' });
  }
}
