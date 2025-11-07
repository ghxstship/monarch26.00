# Library Architecture

This directory contains the core application logic organized by architectural concerns.

## Directory Structure

```
lib/
├── core/              # Core business logic
├── shared/            # Shared utilities & validations
├── features/          # Feature-specific implementations
├── infrastructure/    # Technical infrastructure
└── hooks/            # React hooks
```

## Modules

### 📦 Core (`lib/core/`)
Business logic and domain services.

#### Services (`lib/core/services/`)
Domain-specific business logic services:

- **`auth/`** - Authentication & authorization
  - `AuthService.ts` - User authentication, session management
  
- **`content/`** - Content management
  - `BlogService.ts` - Blog post CRUD operations
  - `ProjectService.ts` - Project/case study management
  - `CommentService.ts` - Comment moderation
  
- **`storage/`** - File & media storage
  - `StorageService.ts` - S3 uploads, media management
  
- **`user/`** - User management
  - `UserService.ts` - User profiles, roles, permissions

**Usage:**
```typescript
import { authService } from '@/lib/core/services/auth';
import { blogService, projectService } from '@/lib/core/services/content';
```

---

### 🔧 Shared (`lib/shared/`)
Reusable utilities and validation schemas.

#### Utils (`lib/shared/utils/`)
Common utility functions:

- **`slug.ts`** - URL slug generation
- **`sanitize.ts`** - Input sanitization & XSS prevention

**Usage:**
```typescript
import { generateSlug } from '@/lib/shared/utils/slug';
import { sanitizeHtml } from '@/lib/shared/utils/sanitize';
// Or use barrel export
import { generateSlug, sanitizeHtml } from '@/lib/shared/utils';
```

#### Validation (`lib/shared/validation/`)
Zod validation schemas:

- **`auth.ts`** - Authentication schemas (login, register, password reset)
- **`content.ts`** - Content schemas (projects, blog posts, comments, filters)
- **`contact.ts`** - Contact form & newsletter schemas

**Usage:**
```typescript
import { loginSchema, registerSchema } from '@/lib/shared/validation/auth';
import { projectSchema, blogFilterSchema } from '@/lib/shared/validation/content';
import { contactFormSchema } from '@/lib/shared/validation/contact';
// Or use barrel export
import { loginSchema, projectSchema } from '@/lib/shared/validation';
```

---

### ⚡ Features (`lib/features/`)
Feature-specific implementations.

#### Analytics (`lib/features/analytics/`)
Privacy-focused analytics tracking (Plausible/Google Analytics).

**Usage:**
```typescript
import { analytics } from '@/lib/features/analytics';

analytics.pageView({ url: '/about', title: 'About Us' });
analytics.trackEvent({ name: 'button_click', properties: { button: 'cta' } });
```

#### Email (`lib/features/email/`)
Email sending service (Resend/Nodemailer).

**Usage:**
```typescript
import { sendWelcomeEmail, sendPasswordResetEmail } from '@/lib/features/email';

await sendWelcomeEmail('user@example.com', 'John Doe');
```

#### Media (`lib/features/media/`)
Image processing and visual patterns.

- **`image-processing.ts`** - Image optimization, resizing
- **`patterns.ts`** - SVG pattern generation (dots, halftone, stripes)

**Usage:**
```typescript
import { optimizeImage } from '@/lib/features/media/image-processing';
import { generateDotPattern } from '@/lib/features/media/patterns';
```

#### Monitoring (`lib/features/monitoring/`)
Error tracking and monitoring.

**Usage:**
```typescript
import { captureError, captureMessage } from '@/lib/features/monitoring';

captureError(new Error('Something went wrong'));
```

---

### 🏗️ Infrastructure (`lib/infrastructure/`)
Technical infrastructure and cross-cutting concerns.

#### Database (`lib/infrastructure/database/`)
Prisma client singleton.

**Usage:**
```typescript
import { prisma } from '@/lib/infrastructure/database';

const users = await prisma.user.findMany();
```

#### Middleware (`lib/infrastructure/middleware/`)
HTTP middleware functions.

- **`auth.ts`** - Authentication middleware
- **`rate-limit.ts`** - Rate limiting middleware

**Usage:**
```typescript
import { authMiddleware, rateLimitMiddleware } from '@/lib/infrastructure/middleware';

// In API route
export const GET = authMiddleware(async (req) => {
  // Protected route logic
});
```

---

### 🎣 Hooks (`lib/hooks/`)
React hooks for client components.

- **`useAuth.tsx`** - Authentication state management

**Usage:**
```typescript
import { useAuth } from '@/lib/hooks';

function MyComponent() {
  const { user, login, logout } = useAuth();
  // ...
}
```

---

## Design Principles

### 1. Separation of Concerns
Each module has a single, well-defined responsibility:
- **Core** = Business logic
- **Shared** = Reusable utilities
- **Features** = Feature implementations
- **Infrastructure** = Technical concerns

### 2. Dependency Direction
```
Components/Pages
    ↓
  Hooks
    ↓
Core Services
    ↓
Infrastructure
```

### 3. Barrel Exports
Each module provides an `index.ts` for clean imports:
```typescript
// Instead of
import { authService } from '@/lib/core/services/auth/AuthService';

// Use
import { authService } from '@/lib/core/services/auth';
```

### 4. Feature Isolation
Features are self-contained and can be:
- Developed independently
- Tested in isolation
- Enabled/disabled via feature flags

---

## Adding New Code

### New Service
1. Create folder in `lib/core/services/[domain]/`
2. Add service class file
3. Export from `index.ts`
4. Update `lib/core/services/index.ts`

### New Utility
1. Add file to `lib/shared/utils/`
2. Export from `lib/shared/utils/index.ts`

### New Feature
1. Create folder in `lib/features/[feature-name]/`
2. Add implementation files
3. Create `index.ts` barrel export

### New Validation Schema
1. Add to appropriate file in `lib/shared/validation/`
2. Export from `lib/shared/validation/index.ts`

---

## Migration Guide

See [`MIGRATION_GUIDE.md`](../MIGRATION_GUIDE.md) for detailed migration instructions from the old structure.

---

## Best Practices

### ✅ Do
- Use barrel exports for cleaner imports
- Keep services focused on single domain
- Write pure utility functions
- Validate all inputs with Zod schemas
- Use TypeScript types from Prisma

### ❌ Don't
- Mix business logic with infrastructure
- Create circular dependencies
- Bypass validation schemas
- Hardcode configuration values
- Import from internal module files directly

---

## Questions?

- Architecture decisions: See `CODEBASE_REORGANIZATION_PLAN.md`
- Migration help: See `MIGRATION_GUIDE.md`
- Summary: See `REORGANIZATION_SUMMARY.md`
