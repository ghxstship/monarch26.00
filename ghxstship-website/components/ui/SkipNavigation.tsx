'use client';

/**
 * Skip Navigation Component
 * Provides keyboard users ability to skip to main content
 * WCAG 2.2 AAA Requirement
 */

export function SkipNavigation() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only
        focus:absolute focus:top-4 focus:left-4
        focus:z-[9999]
        bg-black text-white
        px-6 py-3
        font-bebas uppercase tracking-wide
        border-2 border-white
        focus:outline-none focus:ring-4 focus:ring-white
      "
    >
      Skip to main content
    </a>
  );
}
