import type { NextApiRequest, NextApiResponse } from 'next';
import { cloudinary } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    if (method === 'POST') {
      // For file uploads in Pages Router, we need to use a different approach
      // Use multer or formidable for file parsing
      // This is a placeholder - you'll need to implement multipart parsing
      return res.status(501).json({ error: 'File upload requires additional setup with multer/formidable' });
    } else if (method === 'PUT') {
      return res.status(501).json({ error: 'File upload requires additional setup with multer/formidable' });
    } else {
      res.setHeader('Allow', ['POST', 'PUT']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Yükleme başarısız oldu' });
  }
}
