'use client';

/**
 * Skip Navigation Component
 * Provides keyboard users ability to skip to main content
 * WCAG 2.2 AAA Requirement
 * 
 * Hidden by default, appears when focused via keyboard (Tab key)
 * Allows users to bypass navigation and jump directly to main content
 */

export function SkipNavigation() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only
        focus:fixed focus:top-6 focus:left-6
        focus:z-[10000]
        focus:bg-white focus:text-black
        focus:px-8 focus:py-4
        focus:font-bebas focus:text-xl focus:uppercase focus:tracking-wide
        focus:border-2 focus:border-black
        focus:shadow-lg
        focus:outline-none focus:ring-4 focus:ring-black focus:ring-offset-2
        transition-all duration-200
      "
      onClick={(e) => {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }}
    >
      Skip to Main Content
    </a>
  );
}
