'use client';

export function ProfileSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 mb-8 shadow-card">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-earth-200" />
          
          {/* Info */}
          <div className="flex-1 text-center sm:text-left space-y-3">
            <div className="h-6 bg-earth-200 rounded w-48 mx-auto sm:mx-0" />
            <div className="h-4 bg-earth-200 rounded w-32 mx-auto sm:mx-0" />
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <div className="h-4 bg-earth-200 rounded w-24" />
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="h-6 bg-earth-200 rounded w-12 mx-auto" />
                <div className="h-3 bg-earth-200 rounded w-16 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="hidden lg:block space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-earth-200 rounded-xl" />
          ))}
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-64 bg-earth-200 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
