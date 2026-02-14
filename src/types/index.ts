export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  listingCount: number;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  categoryId: string;
  subcategoryId: string;
  location: Location;
  images: string[];
  features: ListingFeature[];
  seller: Seller;
  status: 'active' | 'passive' | 'sold' | 'pending';
  viewCount: number;
  favoriteCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ListingFeature {
  key: string;
  label: string;
  value: string;
}

export interface Location {
  city: string;
  district: string;
  fullAddress?: string;
}

export interface Seller {
  id: string;
  name: string;
  type: 'individual' | 'business';
  phone: string;
  avatar?: string;
  location: Location;
  rating: number;
  reviewCount: number;
  memberSince: string;
  listingCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  type: 'individual' | 'business';
  location: Location;
  favorites: string[];
  memberSince: string;
  isVerified: boolean;
}

export interface ListingFilters {
  category?: string;
  subcategory?: string;
  city?: string;
  district?: string;
  minPrice?: number;
  maxPrice?: number;
  query?: string;
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'popular';
}
