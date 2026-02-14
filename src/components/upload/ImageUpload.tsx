'use client';

import { useState, useCallback } from 'react';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImagesChange: (images: Array<{ url: string; publicId: string }>) => void;
  maxImages?: number;
  className?: string;
}

export function ImageUpload({
  onImagesChange,
  maxImages = 10,
  className,
}: ImageUploadProps) {
  const [images, setImages] = useState<Array<{ url: string; publicId: string; file?: File }>>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      
      if (files.length + images.length > maxImages) {
        alert(`En fazla ${maxImages} resim yükleyebilirsiniz`);
        return;
      }

      // Sadece resim dosyalarını kabul et
      const imageFiles = files.filter((file) => file.type.startsWith('image/'));
      
      if (imageFiles.length === 0) {
        alert('Lütfen geçerli resim dosyaları seçin');
        return;
      }

      // Önizleme oluştur
      const newImages = imageFiles.map((file) => ({
        url: URL.createObjectURL(file),
        publicId: '',
        file,
      }));

      setImages((prev) => [...prev, ...newImages]);

      // Yükleme başlat
      setUploading(true);
      setUploadProgress(0);

      try {
        const uploadedImages: Array<{ url: string; publicId: string }> = [];

        for (let i = 0; i < imageFiles.length; i++) {
          const file = imageFiles[i];
          const formData = new FormData();
          formData.append('file', file);
          formData.append('folder', 'hayvanpazari/listings');

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Yükleme başarısız');
          }

          const data = await response.json();
          uploadedImages.push({
            url: data.url,
            publicId: data.publicId,
          });

          setUploadProgress(((i + 1) / imageFiles.length) * 100);
        }

        // State'i güncelle
        setImages((prev) => {
          const updated = [...prev];
          let uploadIndex = 0;
          for (let i = 0; i < updated.length; i++) {
            if (updated[i].file && uploadIndex < uploadedImages.length) {
              updated[i] = {
                url: uploadedImages[uploadIndex].url,
                publicId: uploadedImages[uploadIndex].publicId,
              };
              uploadIndex++;
            }
          }
          onImagesChange(updated.filter((img) => img.publicId));
          return updated;
        });
      } catch (error) {
        console.error('Upload error:', error);
        alert('Resimler yüklenirken bir hata oluştu');
        // Hatalı yükleme durumunda önizlemeleri kaldır
        setImages((prev) => prev.filter((img) => img.publicId));
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    },
    [images.length, maxImages, onImagesChange]
  );

  const removeImage = useCallback(
    (index: number) => {
      setImages((prev) => {
        const newImages = [...prev];
        // Eğer yüklendiyse URL'yi temizle
        if (newImages[index].url.startsWith('blob:')) {
          URL.revokeObjectURL(newImages[index].url);
        }
        newImages.splice(index, 1);
        onImagesChange(newImages.filter((img) => img.publicId));
        return newImages;
      });
    },
    [onImagesChange]
  );

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Alanı */}
      <div
        className={cn(
          'border-2 border-dashed rounded-xl p-8 text-center transition-colors',
          uploading
            ? 'border-nature-300 bg-nature-50'
            : 'border-earth-300 hover:border-nature-400 hover:bg-earth-50'
        )}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className={cn(
            'cursor-pointer flex flex-col items-center gap-3',
            uploading && 'pointer-events-none'
          )}
        >
          {uploading ? (
            <>
              <Loader2 className="h-10 w-10 text-nature-500 animate-spin" />
              <div className="space-y-2">
                <p className="text-nature-600 font-medium">Yükleniyor...</p>
                <div className="w-48 h-2 bg-earth-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-nature-500 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-earth-500">%{Math.round(uploadProgress)}</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-earth-100 flex items-center justify-center">
                <Upload className="h-8 w-8 text-earth-500" />
              </div>
              <div>
                <p className="font-medium text-earth-700">
                  Resim yüklemek için tıklayın veya sürükleyin
                </p>
                <p className="text-sm text-earth-500 mt-1">
                  PNG, JPG, WEBP (max. 5MB - {maxImages} resim)
                </p>
              </div>
            </>
          )}
        </label>
      </div>

      {/* Önizlemeler */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden border border-earth-200 group"
            >
              <img
                src={image.url}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Kapat butonu */}
              <button
                onClick={() => removeImage(index)}
                disabled={uploading}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Yükleniyor göstergesi */}
              {!image.publicId && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                </div>
              )}

              {/* Ana resim etiketi */}
              {index === 0 && image.publicId && (
                <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-nature-500 text-white text-xs rounded-full">
                  Kapak
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Bilgi */}
      {images.length > 0 && (
        <p className="text-sm text-earth-500">
          İlk resim ilanınızın kapak fotoğrafı olarak kullanılacaktır. Sürükleyerek sıralamayı değiştirebilirsiniz.
        </p>
      )}
    </div>
  );
}
