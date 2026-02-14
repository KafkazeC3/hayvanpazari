'use client';

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);

    // Define listener
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Add listener
    media.addEventListener('change', listener);

    // Cleanup
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

// Predefined breakpoints
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 640px)');
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1025px)');
}

export function useIsLargeDesktop(): boolean {
  return useMediaQuery('(min-width: 1280px)');
}
