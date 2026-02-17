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
      const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { listings: true }
          }
        }
      });

      // Transform data to include listingCount
      const transformedUsers = users.map(user => ({
        ...user,
        listingCount: user._count.listings,
        _count: undefined
      }));

      return res.status(200).json({ users: transformedUsers });
    } else {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
}
