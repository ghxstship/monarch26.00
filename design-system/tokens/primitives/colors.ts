/**
 * Primitive Color Tokens
 * Base color palette - do not use directly in components
 * Use semantic tokens instead for better maintainability
 */

export const primitiveColors = {
  // Neutral scale (0-950) - Black & White theme
  neutral: {
    0: '#FFFFFF',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
    1000: '#000000',
  },
  
  // Grey scale for GHXSTSHIP brand
  grey: {
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  
  // Semantic color bases
  success: {
    50: '#F0FDF4',
    500: '#22C55E',
    900: '#14532D',
  },
  
  error: {
    50: '#FEF2F2',
    500: '#EF4444',
    900: '#7F1D1D',
  },
  
  warning: {
    50: '#FFFBEB',
    500: '#F59E0B',
    900: '#78350F',
  },
  
  info: {
    50: '#EFF6FF',
    500: '#3B82F6',
    900: '#1E3A8A',
  },
} as const;

// Type safety for token access
export type PrimitiveColor = typeof primitiveColors;
