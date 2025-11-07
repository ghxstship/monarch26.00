# Codebase Reorganization Migration Guide

## Overview
The codebase has been reorganized to improve maintainability, scalability, and developer experience. This guide explains the changes and how to update your code.

## Directory Structure Changes

### Before
```
lib/
├── services/
│   ├── AuthService.ts
│   ├── BlogService.ts
│   ├── ProjectService.ts
│   ├── CommentService.ts
│   ├── StorageService.ts
│   └── UserService.ts
├── middleware/
│   ├── auth.ts
│   └── rateLimit.ts
├── hooks/
│   └── useAuth.tsx
├── analytics.ts
├── db.ts
├── email.ts
├── error-monitoring.ts
├── imageProcessing.ts
├── patterns.ts
└── validations.ts
```

### After
```
lib/
├── core/
│   └── services/
│       ├── auth/
│       │   ├── AuthService.ts
│       │   └── index.ts
│       ├── content/
│       │   ├── BlogService.ts
│       │   ├── ProjectService.ts
│       │   ├── CommentService.ts
│       │   └── index.ts
│       ├── storage/
│       │   ├── StorageService.ts
│       │   └── index.ts
│       ├── user/
│       │   ├── UserService.ts
│       │   └── index.ts
│       └── index.ts
├── shared/
│   ├── utils/
│   │   ├── slug.ts
│   │   ├── sanitize.ts
│   │   └── index.ts
│   └── validation/
│       ├── auth.ts
│       ├── content.ts
│       ├── contact.ts
│       └── index.ts
├── features/
│   ├── analytics/
│   │   ├── analytics.service.ts
│   │   └── index.ts
│   ├── email/
│   │   ├── email.service.ts
│   │   └── index.ts
│   ├── media/
│   │   ├── image-processing.ts
│   │   ├── patterns.ts
│   │   └── index.ts
│   └── monitoring/
│       ├── error-monitoring.ts
│       └── index.ts
├── infrastructure/
│   ├── database/
│   │   ├── client.ts
│   │   └── index.ts
│   └── middleware/
│       ├── auth.ts
│       ├── rate-limit.ts
│       └── index.ts
└── hooks/
    ├── useAuth.tsx
    └── index.ts
```

## Import Path Changes

### Database
```typescript
// Before
import { prisma } from '@/lib/db';

// After
import { prisma } from '@/lib/infrastructure/database';
```

### Services
```typescript
// Before
import { authService } from '@/lib/services/AuthService';
import { blogService } from '@/lib/services/BlogService';
import { projectService } from '@/lib/services/ProjectService';
import { commentService } from '@/lib/services/CommentService';
import { storageService } from '@/lib/services/StorageService';
import { userService } from '@/lib/services/UserService';

// After
import { authService } from '@/lib/core/services/auth';
import { blogService } from '@/lib/core/services/content';
import { projectService } from '@/lib/core/services/content';
import { commentService } from '@/lib/core/services/content';
import { storageService } from '@/lib/core/services/storage';
import { userService } from '@/lib/core/services/user';
```

### Validation
```typescript
// Before
import { loginSchema, registerSchema } from '@/lib/validations';
import { contactFormSchema } from '@/lib/validations';
import { projectSchema, blogPostSchema } from '@/lib/validations';

// After
import { loginSchema, registerSchema } from '@/lib/shared/validation/auth';
import { contactFormSchema } from '@/lib/shared/validation/contact';
import { projectSchema, blogPostSchema } from '@/lib/shared/validation/content';

// Or use barrel export
import { loginSchema, projectSchema } from '@/lib/shared/validation';
```

### Utilities
```typescript
// Before
import { generateSlug, sanitizeHtml } from '@/lib/validations';

// After
import { generateSlug } from '@/lib/shared/utils/slug';
import { sanitizeHtml } from '@/lib/shared/utils/sanitize';

// Or use barrel export
import { generateSlug, sanitizeHtml } from '@/lib/shared/utils';
```

### Features
```typescript
// Before
import { analytics } from '@/lib/analytics';
import { sendWelcomeEmail } from '@/lib/email';

// After
import { analytics } from '@/lib/features/analytics';
import { sendWelcomeEmail } from '@/lib/features/email';
```

### Middleware
```typescript
// Before
import { authMiddleware } from '@/lib/middleware/auth';
import { rateLimitMiddleware } from '@/lib/middleware/rateLimit';

// After
import { authMiddleware, rateLimitMiddleware } from '@/lib/infrastructure/middleware';
```

### Hooks
```typescript
// Before
import { useAuth } from '@/lib/hooks/useAuth';

// After
import { useAuth } from '@/lib/hooks';
```

## Benefits of New Structure

### 1. Clear Separation of Concerns
- **Core**: Business logic and domain services
- **Shared**: Reusable utilities and validations
- **Features**: Feature-specific implementations
- **Infrastructure**: Technical concerns (database, middleware)

### 2. Better Discoverability
- Related code is grouped together
- Barrel exports make imports cleaner
- Intuitive folder names

### 3. Scalability
- Easy to add new features without cluttering existing code
- Clear boundaries between modules
- Feature-based organization supports team scaling

### 4. Maintainability
- Easier to locate and update code
- Reduced cognitive load
- Better IDE support with barrel exports

## Automated Migration

All import paths have been automatically updated using the migration script:
```bash
./scripts/update-imports.sh
```

## Verification Steps

1. **Type Check**
   ```bash
   npm run typecheck
   ```

2. **Lint**
   ```bash
   npm run lint
   ```

3. **Build**
   ```bash
   npm run build
   ```

4. **Tests**
   ```bash
   npm test
   ```

## Rollback

If you need to rollback:
```bash
git revert HEAD
```

## Questions?

Refer to `CODEBASE_REORGANIZATION_PLAN.md` for detailed architecture decisions.
