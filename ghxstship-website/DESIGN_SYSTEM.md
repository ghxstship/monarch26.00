# GHXSTSHIP Design System Documentation

## Overview

This design system implements atomic design principles with zero hardcoded values, ensuring consistency, maintainability, and accessibility across the entire application.

## Core Principles

1. **Token-First Architecture**: All design values are defined as tokens
2. **Responsive by Default**: Mobile-first with fluid scaling
3. **Accessibility Mandatory**: WCAG 2.2 AAA compliance
4. **International Ready**: RTL support and locale-aware formatting
5. **Privacy Compliant**: GDPR/CCPA cookie consent

## Design Tokens

### Color Tokens

```css
--color-black: #000000
--color-white: #ffffff
--color-grey-100 through --color-grey-900
```

### Spacing Tokens

```css
--space-1: 0.25rem (4px)
--space-2: 0.5rem (8px)
--space-3: 0.75rem (12px)
--space-4: 1rem (16px)
--space-6: 1.5rem (24px)
--space-8: 2rem (32px)
--space-10: 2.5rem (40px)
--space-12: 3rem (48px)
--space-16: 4rem (64px)
--space-20: 5rem (80px)
```

### Typography Tokens

```css
--font-anton: Display font
--font-bebas: Headings font
--font-share: Body font
--font-share-mono: Monospace font

--font-size-hero: clamp(3rem, 10vw, 7.5rem)
--font-size-h1: clamp(2.25rem, 8vw, 5rem)
--font-size-h2: clamp(1.75rem, 5vw, 3.5rem)
--font-size-h3: clamp(1.5rem, 4vw, 2.5rem)
--font-size-h4: clamp(1.25rem, 3vw, 2rem)
--font-size-h5: clamp(1.125rem, 2.5vw, 1.5rem)
--font-size-h6: clamp(1rem, 2vw, 1.25rem)
--font-size-body: clamp(0.9375rem, 1.5vw, 1.125rem)
--font-size-meta: clamp(0.6875rem, 1.2vw, 0.875rem)
```

### Animation Tokens

```css
--duration-fast: 150ms
--duration-base: 250ms
--duration-slow: 350ms
--easing-out: cubic-bezier(0, 0, 0.2, 1)
```

### Border Radius Tokens

```css
--radius-sm: 0.125rem
--radius-md: 0.375rem
--radius-lg: 0.5rem
```

## Component Library

### Atoms

- **Button**: Primary UI interaction element
  - Variants: `outlined`, `filled`
  - Sizes: `sm`, `md`, `lg`
  - Minimum touch target: 44px (AAA compliance)

- **Input**: Form input fields
- **Typography**: Text rendering components

### Molecules

- **Card**: Content container
- **Modal**: Dialog overlay with focus trap

### Organisms

- **Header**: Navigation with mobile menu
- **Footer**: Site footer with links
- **CookieConsent**: GDPR/CCPA compliant banner

## Accessibility Features

### Focus Management

```typescript
import { FocusManager } from '@/design-system/utils/focus-management';

const focusManager = new FocusManager();
focusManager.trapFocus(containerElement);
```

### ARIA Patterns

All interactive components implement proper ARIA attributes:
- `role`, `aria-label`, `aria-labelledby`
- `aria-modal`, `aria-expanded`, `aria-controls`
- Keyboard navigation support

### Keyboard Navigation

- Tab: Navigate between focusable elements
- Escape: Close modals/dialogs
- Arrow keys: Navigate menus (where applicable)
- Enter/Space: Activate buttons

## Internationalization

### RTL Support

Use logical CSS properties:
```css
/* ❌ Avoid */
margin-left: 1rem;

/* ✅ Use */
margin-inline-start: var(--space-4);
```

### Locale Formatting

```typescript
import { Formatters } from '@/design-system/utils/formatters';

const formatters = new Formatters('en-US');
formatters.formatDate(new Date());
formatters.formatCurrency(1234.56);
```

## Privacy Compliance

### Cookie Consent

The `CookieConsent` component provides:
- Granular cookie category control
- Accept all / Reject all options
- Persistent preferences storage
- Links to privacy policy and terms

## Validation

Run token validation:
```bash
npm run validate-tokens
```

This checks for:
- Hardcoded hex colors
- Hardcoded pixel values
- Non-RTL-friendly properties
- Missing design tokens

## Best Practices

1. **Never hardcode values**: Always use design tokens
2. **Mobile-first**: Start with mobile layouts, enhance for larger screens
3. **Semantic HTML**: Use proper HTML5 elements
4. **ARIA when needed**: Add ARIA attributes for custom components
5. **Test accessibility**: Use keyboard navigation and screen readers
6. **Respect user preferences**: Honor `prefers-reduced-motion`

## Responsive Breakpoints

```typescript
xs: 320px   // Mobile small
sm: 640px   // Mobile large
md: 768px   // Tablet
lg: 1024px  // Desktop small
xl: 1280px  // Desktop large
2xl: 1536px // Desktop XL
3xl: 1920px // Ultra-wide
```

## Contributing

When adding new components:

1. Use existing design tokens
2. Implement proper accessibility
3. Support responsive behavior
4. Add keyboard navigation
5. Test with screen readers
6. Document usage examples

## Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Web Docs](https://developer.mozilla.org/)
