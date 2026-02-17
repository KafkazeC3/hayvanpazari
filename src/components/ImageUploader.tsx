'use client';

import { useState, useCallback, useRef } from 'react';
import { X, Upload, Loader2, ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export function ImageUploader({ images, onImagesChange, maxImages = 10 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        
        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file: base64 }),
          });

          if (!response.ok) throw new Error('Upload failed');
          
          const data = await response.json();
          resolve(data.url);
        } catch (error) {
          console.error('Upload error:', error);
          alert('Fotoğraf yüklenirken hata oluştu. Cloudinary ayarlarını kontrol edin.');
          resolve(null);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const remainingSlots = maxImages - images.length;
    const filesToUpload = Array.from(files).slice(0, remainingSlots);

    if (filesToUpload.length === 0) {
      alert(`En fazla ${maxImages} fotoğraf yükleyebilirsiniz.`);
      return;
    }

    setUploading(true);

    for (const file of filesToUpload) {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} bir resim dosyası değil.`);
        continue;
      }
      
      // Max 5MB
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} çok büyük (max 5MB)`);
        continue;
      }

      const url = await handleUpload(file);
      if (url) {
        onImagesChange([...images, url]);
      }
    }

    setUploading(false);
    // Reset input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, [images]);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  const canAddMore = images.length < maxImages;

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {canAddMore && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
            ${dragActive 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
            }
            ${uploading ? 'pointer-events-none opacity-60' : ''}
          `}
        >
          {/* Hidden Input */}
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
            disabled={uploading}
          />
          
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
              <p className="text-gray-600 font-medium">Fotoğraflar yükleniyor...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <Upload className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <p className="text-gray-700 font-medium">
                  Fotoğraf yüklemek için tıklayın veya sürükleyip bırakın
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  JPG, PNG, WEBP • Max 5MB • {images.length}/{maxImages} fotoğraf
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {images.map((url, index) => (
            <div key={index} className="relative aspect-square group">
              <img
                src={url}
                alt={`Fotoğraf ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              
              {/* Main image badge */}
              {index === 0 && (
                <div className="absolute top-1 left-1 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                  Ana Fotoğraf
                </div>
              )}
              
              {/* Remove button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          
          {/* Empty slots */}
          {canAddMore && Array.from({ length: Math.min(3, maxImages - images.length) }).map((_, i) => (
            <div 
              key={`empty-${i}`} 
              onClick={handleButtonClick}
              className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:border-green-300 hover:bg-green-50 transition-colors"
            >
              <ImageIcon className="w-8 h-8 text-gray-200" />
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-amber-800 font-medium text-sm mb-2">💡 İpuçları:</p>
        <ul className="text-amber-700 text-sm space-y-1 list-disc list-inside">
          <li>En az 3, en fazla {maxImages} fotoğraf yükleyin</li>
          <li>İlk fotoğraf ana görseliniz olacak</li>
          <li>Hayvanı farklı açılardan çekin</li>
          <li>Gün ışığında ve net çekim yapın</li>
        </ul>
      </div>
    </div>
  );
}
