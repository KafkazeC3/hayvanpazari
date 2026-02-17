'use client';

import Link from 'next/link';
import { MapPin, Calendar, Heart } from 'lucide-react';

interface ListingCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  district: string;
  category: string;
  image: string;
  date: string;
  seller: { name: string };
}

export function ListingCardModern({ 
  id, 
  title, 
  description, 
  price, 
  city, 
  district, 
  category, 
  image, 
  date, 
  seller 
}: ListingCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR').format(price) + ' ₺';
  };

  return (
    <Link 
      href={`/ilan/${id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-green-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        </div>

        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            // Favori işlemi
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm"
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-lg inline-block">
            {formatPrice(price)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-green-600 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Location & Date */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-green-500" />
            <span>{city}, {district}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        </div>

        {/* Seller */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {seller.name.charAt(0)}
            </div>
            <span className="text-sm text-gray-600 font-medium">{seller.name}</span>
          </div>
          <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
            Satıcı
          </span>
        </div>
      </div>
    </Link>
  );
}
