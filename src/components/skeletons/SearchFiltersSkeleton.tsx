'use client';

export function SearchFiltersSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex flex-wrap gap-4">
          {/* Search Input */}
          <div className="flex-1 min-w-[200px] h-12 bg-earth-200 rounded-lg" />
          
          {/* Category Select */}
          <div className="w-40 h-12 bg-earth-200 rounded-lg" />
          
          {/* City Select */}
          <div className="w-40 h-12 bg-earth-200 rounded-lg" />
          
          {/* Price Range */}
          <div className="w-32 h-12 bg-earth-200 rounded-lg" />
          
          {/* Sort */}
          <div className="w-36 h-12 bg-earth-200 rounded-lg" />
        </div>
      </div>
      
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-5 bg-earth-200 rounded w-32" />
        <div className="h-5 bg-earth-200 rounded w-24" />
      </div>
      
      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-[4/3] bg-earth-200 rounded-xl" />
            <div className="h-5 bg-earth-200 rounded w-2/3" />
            <div className="h-4 bg-earth-200 rounded w-1/2" />
            <div className="h-4 bg-earth-200 rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
