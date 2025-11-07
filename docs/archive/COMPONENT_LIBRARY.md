# GHXSTSHIP Component Library Documentation

**Version:** 1.0.0  
**Last Updated:** January 6, 2025  
**Design System:** Monochromatic Brutalist

---

## 🎨 Design Principles

### Color Palette
- **Primary:** Pure Black (#000000)
- **Secondary:** Pure White (#FFFFFF)
- **Greys:** 9-step scale from #f5f5f5 to #171717
- **No Color:** Absolutely no hues beyond black/white/grey

### Typography
- **Anton:** Hero headlines (400 weight)
- **Bebas Neue:** Section headers H2-H6 (400 weight)
- **Share Tech:** Body copy (400 weight)
- **Share Tech Mono:** Metadata, labels (400 weight)

### Spacing System
- Base unit: 4px
- Scale: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80px

---

## 📦 Component Inventory

### Atoms (Basic Building Blocks)

#### Button
**File:** `components/ui/Button.tsx`  
**Status:** ✅ Complete  
**Accessibility:** ✅ WCAG 2.1 AA

**Props:**
```typescript
interface ButtonProps {
  variant?: 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  href?: string;
}
```

**Variants:**
- `outlined`: Black border, transparent background, hover inverts
- `filled`: Black background, white text, hover inverts

**Sizes:**
- `sm`: px-4 py-2, text-sm
- `md`: px-6 py-3, text-base (default)
- `lg`: px-8 py-4, text-lg

**Accessibility Features:**
- Keyboard navigable
- Focus indicators
- ARIA labels
- Disabled state
- Motion animations with `prefers-reduced-motion` support

---

#### Input
**File:** `components/ui/Input.tsx`  
**Status:** ✅ Complete  
**Accessibility:** ✅ WCAG 2.1 AA

**Props:**
```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number';
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}
```

**Features:**
- Label association
- Error state with message
- Required indicator
- Disabled state
- Focus styles

---

#### Typography
**File:** `components/ui/Typography.tsx`  
**Status:** ✅ Complete  
**Accessibility:** ✅ WCAG 2.1 AA

**Variants:**
- `hero`: 120px+ (Anton)
- `h1`: 80px (Anton)
- `h2`: 60px (Bebas Neue)
- `h3`: 48px (Bebas Neue)
- `h4`: 36px (Bebas Neue)
- `h5`: 24px (Bebas Neue)
- `h6`: 20px (Bebas Neue)
- `body`: 16-18px (Share Tech)
- `meta`: 12-14px (Share Tech Mono)

**Props:**
```typescript
interface TypographyProps {
  variant?: 'hero' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'meta';
  children: React.ReactNode;
  className?: string;
  uppercase?: boolean;
  as?: keyof JSX.IntrinsicElements;
}
```

---

#### Badge
**File:** `components/ui/Badge.tsx`  
**Status:** ✅ Complete

**Props:**
```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
  className?: string;
}
```

---

#### Avatar
**File:** `components/ui/Avatar.tsx`  
**Status:** ✅ Complete

**Props:**
```typescript
interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  fallback?: string;
}
```

---

#### Spinner
**File:** `components/ui/Spinner.tsx`  
**Status:** ✅ Complete

**Props:**
```typescript
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

---

#### Divider
**File:** `components/ui/Divider.tsx`  
**Status:** ✅ Complete

**Props:**
```typescript
interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}
```

---

#### SkipNavigation
**File:** `components/ui/SkipNavigation.tsx`  
**Status:** ✅ Complete  
**Accessibility:** ✅ WCAG 2.1 AA

**Purpose:** Allows keyboard users to skip navigation and jump to main content

---

### Molecules (Component Combinations)

#### Card
**File:** `components/ui/Card.tsx`  
**Status:** ✅ Complete

**Props:**
```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}
```

**Features:**
- Border styling
- Hover effects
- Clickable variant
- Responsive padding

---

#### Modal
**File:** `components/ui/Modal.tsx`  
**Status:** ✅ Complete  
**Accessibility:** ✅ WCAG 2.1 AA

**Props:**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
```

**Accessibility Features:**
- Focus trap
- ESC key to close
- Click outside to close
- ARIA labels
- Body scroll lock

---

#### CountUp
**File:** `components/ui/CountUp.tsx`  
**Status:** ✅ Complete

**Props:**
```typescript
interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}
```

**Features:**
- Intersection Observer (animates when in view)
- Customizable duration
- Prefix/suffix support

---

### Organisms (Complex Components)

#### Header
**File:** `components/layout/Header.tsx`  
**Status:** ✅ Complete  
**Accessibility:** ✅ WCAG 2.1 AA

**Features:**
- Responsive navigation
- Mobile menu
- Sticky positioning
- Logo
- Navigation links
- CTA button

---

#### Footer
**File:** `components/layout/Footer.tsx`  
**Status:** ✅ Complete  
**Accessibility:** ✅ WCAG 2.1 AA

**Features:**
- Multi-column layout
- Social links
- Newsletter signup
- Copyright
- Legal links

---

#### Container
**File:** `components/layout/Container.tsx`  
**Status:** ✅ Complete

**Props:**
```typescript
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}
```

---

### Sections (Page Sections)

#### Hero
**File:** `components/sections/Hero.tsx`  
**Status:** ✅ Complete

**Features:**
- Full viewport height
- Animated headline
- CTA buttons
- Scroll indicator

---

#### Services
**File:** `components/sections/Services.tsx`  
**Status:** ✅ Complete

**Features:**
- 4 D's framework display
- Grid layout
- Hover effects
- Icons

---

#### Verticals
**File:** `components/sections/Verticals.tsx`  
**Status:** ✅ Complete

**Features:**
- 4 vertical categories
- Card-based layout
- Links to detail pages

---

#### FeaturedProjects
**File:** `components/sections/FeaturedProjects.tsx`  
**Status:** ✅ Complete

**Features:**
- Project grid
- Image display
- Metadata
- Links to project pages

---

#### CTA
**File:** `components/sections/CTA.tsx`  
**Status:** ✅ Complete

**Features:**
- Call-to-action section
- Button group
- Background styling

---

#### VerticalTemplate
**File:** `components/sections/VerticalTemplate.tsx`  
**Status:** ✅ Complete

**Purpose:** Reusable template for vertical detail pages

---

### Animations

#### FadeIn
**File:** `components/animations/FadeIn.tsx`  
**Status:** ✅ Complete

**Props:**
```typescript
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}
```

---

#### SlideUp
**File:** `components/animations/SlideUp.tsx`  
**Status:** ✅ Complete

**Props:**
```typescript
interface SlideUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}
```

---

### Compliance

#### CookieConsent
**File:** `components/compliance/CookieConsent.tsx`  
**Status:** ✅ Complete  
**Accessibility:** ✅ WCAG 2.1 AA

**Features:**
- GDPR compliant
- Accept/Decline options
- Persistent storage
- Dismissible

---

## 🎯 Component Status Summary

### Complete (23/23) - 100%
- ✅ All atoms implemented
- ✅ All molecules implemented
- ✅ All organisms implemented
- ✅ All sections implemented
- ✅ All animations implemented
- ✅ Compliance components implemented

### Accessibility Status
- ✅ WCAG 2.1 AA compliant
- ✅ Keyboard navigation
- ✅ Screen reader compatible
- ✅ Focus indicators
- ✅ ARIA labels
- ✅ Color contrast ratios met

### Missing Components (Identified for Future)
- [ ] Toast/Notification system
- [ ] Dropdown/Select component
- [ ] Table component (for admin)
- [ ] Pagination component
- [ ] Tabs component
- [ ] Accordion component
- [ ] Breadcrumbs component
- [ ] Progress bar component

---

## 🚀 Usage Examples

### Button
```tsx
import { Button } from '@/components/ui/Button';

<Button variant="outlined" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

### Card with Animation
```tsx
import { Card } from '@/components/ui/Card';
import { FadeIn } from '@/components/animations/FadeIn';

<FadeIn delay={0.2}>
  <Card hover onClick={handleCardClick}>
    <h3>Card Title</h3>
    <p>Card content</p>
  </Card>
</FadeIn>
```

### Modal
```tsx
import { Modal } from '@/components/ui/Modal';

<Modal isOpen={isOpen} onClose={handleClose} title="Modal Title">
  <p>Modal content</p>
</Modal>
```

---

## 📱 Responsive Breakpoints

- **Mobile:** 320px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px - 1439px
- **Large Desktop:** 1440px+

All components are fully responsive and tested across all breakpoints.

---

## ♿ Accessibility Guidelines

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab order is logical
- Focus indicators are visible
- ESC key closes modals/menus

### Screen Readers
- All images have alt text
- ARIA labels on interactive elements
- Semantic HTML structure
- Skip navigation links

### Color Contrast
- All text meets WCAG 2.1 AA standards
- Minimum 4.5:1 contrast ratio for normal text
- Minimum 3:1 contrast ratio for large text

---

## 🎨 Design Tokens

### Colors
```css
--black: #000000
--white: #ffffff
--grey-100: #f5f5f5
--grey-200: #e5e5e5
--grey-300: #d4d4d4
--grey-400: #a3a3a3
--grey-500: #737373
--grey-600: #525252
--grey-700: #404040
--grey-800: #262626
--grey-900: #171717
```

### Typography Scale
```css
--font-size-hero: clamp(3rem, 10vw, 7.5rem)
--font-size-h1: clamp(2.25rem, 8vw, 5rem)
--font-size-h2: clamp(1.75rem, 5vw, 3.5rem)
--font-size-h3: clamp(1.5rem, 4vw, 2.5rem)
--font-size-body: clamp(0.9375rem, 1.5vw, 1.125rem)
```

### Spacing Scale
```css
--space-1: 0.25rem (4px)
--space-2: 0.5rem (8px)
--space-4: 1rem (16px)
--space-8: 2rem (32px)
--space-16: 4rem (64px)
```

---

## 🔧 Development

### Adding New Components
1. Create component file in appropriate directory
2. Add TypeScript interfaces
3. Implement accessibility features
4. Add to this documentation
5. Write tests
6. Add to Storybook (if available)

### Component Checklist
- [ ] TypeScript types defined
- [ ] Props documented
- [ ] Accessibility features implemented
- [ ] Responsive design tested
- [ ] Dark mode compatible (if applicable)
- [ ] Tests written
- [ ] Documentation updated

---

**Maintained by:** GHXSTSHIP Development Team  
**Questions:** Contact development team
