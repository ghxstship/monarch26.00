/**
 * Typography Tokens
 * Font families, sizes, weights, and related properties
 */

export const typography = {
  fontFamily: {
    anton: 'var(--font-anton), sans-serif',
    bebas: 'var(--font-bebas), sans-serif',
    share: 'var(--font-share), monospace',
    shareMono: 'var(--font-share-mono), monospace',
    sans: 'system-ui, -apple-system, sans-serif',
    mono: 'Consolas, monospace',
  },
  
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
    '8xl': '6rem',      // 96px
    '9xl': '8rem',      // 128px
    // Fluid responsive sizes
    hero: 'clamp(3rem, 10vw, 7.5rem)',      // 48px - 120px
    h1: 'clamp(2.25rem, 8vw, 5rem)',        // 36px - 80px
    h2: 'clamp(1.75rem, 5vw, 3.5rem)',      // 28px - 56px
    h3: 'clamp(1.5rem, 4vw, 2.5rem)',       // 24px - 40px
    h4: 'clamp(1.25rem, 3vw, 2rem)',        // 20px - 32px
    h5: 'clamp(1.125rem, 2.5vw, 1.5rem)',   // 18px - 24px
    h6: 'clamp(1rem, 2vw, 1.25rem)',        // 16px - 20px
    body: 'clamp(0.9375rem, 1.5vw, 1.125rem)', // 15px - 18px
    meta: 'clamp(0.6875rem, 1.2vw, 0.875rem)', // 11px - 14px
  },
  
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

export type Typography = typeof typography;
