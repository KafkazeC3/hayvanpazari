'use client';

export function ListingDetailSkeleton() {
  return (
    <div className="min-h-screen bg-earth-50/30 animate-pulse">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="aspect-video bg-earth-200 rounded-2xl" />
            
            {/* Title & Price */}
            <div className="space-y-3">
              <div className="h-8 bg-earth-200 rounded w-3/4" />
              <div className="h-6 bg-earth-200 rounded w-1/3" />
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 bg-earth-200 rounded-xl" />
              ))}
            </div>
            
            {/* Description */}
            <div className="space-y-3">
              <div className="h-4 bg-earth-200 rounded w-full" />
              <div className="h-4 bg-earth-200 rounded w-full" />
              <div className="h-4 bg-earth-200 rounded w-2/3" />
            </div>
          </div>
          
          {/* Right Column - Seller Card */}
          <div className="space-y-6">
            <div className="h-80 bg-earth-200 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
