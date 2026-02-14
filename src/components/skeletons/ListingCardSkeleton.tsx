'use client';

import { Card } from '@/components/ui/card';

export function ListingCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] bg-earth-200" />
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Price */}
        <div className="h-6 bg-earth-200 rounded w-1/2" />
        
        {/* Title */}
        <div className="h-4 bg-earth-200 rounded w-3/4" />
        <div className="h-4 bg-earth-200 rounded w-1/2" />
        
        {/* Location */}
        <div className="h-3 bg-earth-200 rounded w-2/3" />
        
        {/* Footer */}
        <div className="pt-3 border-t border-earth-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-earth-200" />
            <div className="h-3 bg-earth-200 rounded w-20" />
          </div>
          <div className="h-3 bg-earth-200 rounded w-16" />
        </div>
      </div>
    </Card>
  );
}

export function ListingCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ListingCardSkeleton key={i} />
      ))}
    </div>
  );
}
