import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { file, folder = 'hayvanpazari/listings' } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'Dosya bulunamadı' });
    }

    // Base64 formatında dosya yükleme
    const uploadResult = await cloudinary.uploader.upload(file, {
      folder,
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
        { width: 1200, height: 1200, crop: 'limit' }, // Max 1200x1200
      ],
    });

    return res.status(200).json({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      success: true,
    });
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    
    // Daha detaylı hata mesajı
    let errorMessage = 'Yükleme başarısız oldu';
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Yaygın hataları kontrol et
      if (errorMessage.includes('Invalid API Key')) {
        errorMessage = 'Geçersiz API Key. Cloudinary API Key\'inizi kontrol edin.';
      } else if (errorMessage.includes('Invalid API Secret')) {
        errorMessage = 'Geçersiz API Secret. Cloudinary API Secret\'inizi kontrol edin.';
      } else if (errorMessage.includes('cloud_name')) {
        errorMessage = 'Geçersiz Cloud Name. Cloudinary Cloud Name\'inizi kontrol edin.';
      } else if (errorMessage.includes('timed out')) {
        errorMessage = 'Bağlantı zaman aşımına uğradı. İnternet bağlantınızı kontrol edin.';
      }
    }
    
    return res.status(500).json({ 
      error: errorMessage,
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
