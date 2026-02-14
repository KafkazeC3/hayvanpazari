import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

// Resim yükleme fonksiyonu
export async function uploadImage(
  file: string,
  folder: string = 'hayvanpazari'
): Promise<{ url: string; publicId: string }> {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
      ],
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Resim yüklenirken bir hata oluştu');
  }
}

// Çoklu resim yükleme
export async function uploadMultipleImages(
  files: string[],
  folder: string = 'hayvanpazari/listings'
): Promise<Array<{ url: string; publicId: string }>> {
  const uploadPromises = files.map((file) => uploadImage(file, folder));
  return Promise.all(uploadPromises);
}

// Resim silme
export async function deleteImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Resim silinirken bir hata oluştu');
  }
}

// Base64'ten upload için yardımcı fonksiyon
export function bufferToBase64(buffer: Buffer): string {
  return `data:image/jpeg;base64,${buffer.toString('base64')}`;
}
