import { cn, formatPrice, formatDate, truncateText, getInitials } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('cn (className merge)', () => {
    it('merges class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('handles conditional classes', () => {
      expect(cn('base', true && 'conditional')).toBe('base conditional');
      expect(cn('base', false && 'conditional')).toBe('base');
    });

    it('handles tailwind merge conflicts', () => {
      expect(cn('px-2', 'px-4')).toBe('px-4');
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    });
  });

  describe('formatPrice', () => {
    it('formats price correctly with TRY currency', () => {
      expect(formatPrice(15000)).toBe('₺15.000,00');
      expect(formatPrice(1500.5)).toBe('₺1.500,50');
    });

    it('handles zero price', () => {
      expect(formatPrice(0)).toBe('₺0,00');
    });

    it('handles large numbers', () => {
      expect(formatPrice(1000000)).toBe('₺1.000.000,00');
    });
  });

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = '2024-01-15T10:30:00Z';
      const formatted = formatDate(date);
      expect(formatted).toContain('15');
      expect(formatted).toContain('2024');
    });

    it('handles invalid dates', () => {
      expect(formatDate('invalid')).toBe('Geçersiz tarih');
    });
  });

  describe('truncateText', () => {
    it('truncates long text correctly', () => {
      const longText = 'This is a very long text that should be truncated';
      expect(truncateText(longText, 20)).toBe('This is a very long...');
    });

    it('does not truncate short text', () => {
      const shortText = 'Short text';
      expect(truncateText(shortText, 20)).toBe('Short text');
    });

    it('uses custom suffix', () => {
      expect(truncateText('Long text here', 5, '...')).toBe('Long...');
    });
  });

  describe('getInitials', () => {
    it('gets initials from full name', () => {
      expect(getInitials('Ahmet Yılmaz')).toBe('AY');
    });

    it('handles single name', () => {
      expect(getInitials('Ahmet')).toBe('A');
    });

    it('handles multiple names', () => {
      expect(getInitials('Ahmet Mehmet Yılmaz')).toBe('AMY');
    });

    it('handles empty string', () => {
      expect(getInitials('')).toBe('');
    });
  });
});
