import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = 'TRY'): string {
  // TL yerine TRY kullan (ISO 4217 standardı)
  const validCurrency = currency === 'TL' ? 'TRY' : currency;
  
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: validCurrency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInMinutes < 1) return 'Az önce';
  if (diffInMinutes < 60) return `${diffInMinutes} dakika önce`;
  if (diffInHours < 24) return `${diffInHours} saat önce`;
  if (diffInDays === 1) return 'Dün';
  if (diffInDays < 7) return `${diffInDays} gün önce`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} hafta önce`;
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

// formatDistanceToNow alias (date-fns uyumluluğu için)
export const formatDistanceToNow = formatDate;
