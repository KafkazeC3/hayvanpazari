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

      const updatedSetting = await prisma.setting.update({
        where: { id: id as string },
        data: { value: body.value },
      });

      return res.status(200).json({ setting: updatedSetting });
    } else {
      res.setHeader('Allow', ['PATCH']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error updating setting:', error);
    return res.status(500).json({ error: 'Failed to update setting' });
  }
}
