import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id } = req.query;

  try {
    if (method === 'PATCH') {
      const body = req.body;

      const updatedUser = await prisma.user.update({
        where: { id: id as string },
        data: body,
      });

      return res.status(200).json({ user: updatedUser });
    } else {
      res.setHeader('Allow', ['PATCH']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Failed to update user' });
  }
}
