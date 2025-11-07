# Codebase Reorganization Plan

## Executive Summary
This document outlines the comprehensive reorganization of the ghxstship-website codebase to improve maintainability, scalability, and developer experience.

## Current Issues
1. **Scattered utilities** - Multiple utility files in `/lib` root without clear organization
2. **Empty directories** - `types/`, `utils/` directories exist but are unused
3. **Inconsistent patterns** - Services follow one pattern, utilities another
4. **No shared abstractions** - Duplicate pagination, error handling, validation logic
5. **Mixed concerns** - Business logic, utilities, and configuration not clearly separated

## New Directory Structure

```
lib/
├── core/                      # Core business logic
│   ├── services/             # Business services (existing)
│   │   ├── auth/            # Auth-related services
│   │   │   ├── AuthService.ts
│   │   │   └── index.ts
│   │   ├── content/         # Content management
│   │   │   ├── BlogService.ts
│   │   │   ├── ProjectService.ts
│   │   │   ├── CommentService.ts
│   │   │   └── index.ts
│   │   ├── storage/         # Storage & media
│   │   │   ├── StorageService.ts
│   │   │   └── index.ts
│   │   ├── user/            # User management
│   │   │   ├── UserService.ts
│   │   │   └── index.ts
│   │   └── index.ts         # Barrel export
│   ├── repositories/         # Data access layer (future)
│   └── domain/              # Domain models & types (future)
│
├── shared/                   # Shared utilities & helpers
│   ├── utils/               # General utilities
│   │   ├── slug.ts         # Slug generation
│   │   ├── date.ts         # Date formatting
│   │   ├── string.ts       # String manipulation
│   │   └── index.ts
│   ├── validation/          # Validation schemas
│   │   ├── auth.ts         # Auth validations
│   │   ├── content.ts      # Content validations
│   │   ├── contact.ts      # Contact form validations
│   │   └── index.ts
│   ├── constants/           # Application constants
│   │   ├── errors.ts       # Error messages
│   │   ├── config.ts       # Configuration constants
│   │   └── index.ts
│   └── types/               # Shared TypeScript types
│       ├── api.ts          # API types
│       ├── models.ts       # Data model types
│       └── index.ts
│
├── features/                 # Feature-specific code
│   ├── analytics/           # Analytics feature
│   │   ├── analytics.service.ts
│   │   ├── analytics.types.ts
│   │   └── index.ts
│   ├── email/               # Email feature
│   │   ├── email.service.ts
│   │   ├── email.templates.ts
│   │   └── index.ts
│   ├── media/               # Media processing
│   │   ├── image-processing.ts
│   │   ├── patterns.ts     # Visual patterns
│   │   └── index.ts
│   └── monitoring/          # Error monitoring
│       ├── error-monitoring.ts
│       └── index.ts
│
├── infrastructure/           # Infrastructure concerns
│   ├── database/            # Database configuration
│   │   ├── client.ts       # Prisma client (db.ts)
│   │   └── index.ts
│   ├── middleware/          # HTTP middleware
│   │   ├── auth.ts
│   │   ├── rate-limit.ts
│   │   └── index.ts
│   └── config/              # App configuration
│       ├── env.ts          # Environment variables
│       └── index.ts
│
└── hooks/                    # React hooks
    ├── useAuth.tsx
    └── index.ts
```

## Migration Steps

### Phase 1: Create New Structure
1. Create new directory structure
2. Create barrel exports (index.ts files)

### Phase 2: Move & Refactor Services
1. Group services by domain:
   - Auth services → `core/services/auth/`
   - Content services → `core/services/content/`
   - Storage services → `core/services/storage/`
   - User services → `core/services/user/`

### Phase 3: Organize Utilities
1. Split `validations.ts` into feature-specific files
2. Extract utility functions from services
3. Move to `shared/utils/`

### Phase 4: Feature Modules
1. Move `analytics.ts` → `features/analytics/`
2. Move `email.ts` → `features/email/`
3. Move `imageProcessing.ts` → `features/media/`
4. Move `patterns.ts` → `features/media/`
5. Move `error-monitoring.ts` → `features/monitoring/`

### Phase 5: Infrastructure
1. Move `db.ts` → `infrastructure/database/client.ts`
2. Move middleware → `infrastructure/middleware/`
3. Create config module for environment variables

### Phase 6: Update Imports
1. Update all import paths in services
2. Update all import paths in API routes
3. Update all import paths in components
4. Update tsconfig paths if needed

### Phase 7: Cleanup
1. Remove old files
2. Remove empty directories
3. Run build verification
4. Run tests

## Benefits

1. **Clear Separation of Concerns**
   - Core business logic isolated
   - Infrastructure concerns separated
   - Shared utilities easily discoverable

2. **Improved Scalability**
   - Feature-based organization allows independent development
   - Easy to add new features without cluttering existing code

3. **Better Developer Experience**
   - Intuitive file locations
   - Reduced cognitive load
   - Easier onboarding for new developers

4. **Maintainability**
   - Related code grouped together
   - Easier to refactor and test
   - Clear dependencies

5. **Type Safety**
   - Centralized type definitions
   - Better IDE support
   - Reduced type duplication

## Implementation Notes

- All moves should be done with care to preserve git history
- Update imports incrementally to avoid breaking changes
- Run type checking after each major change
- Keep the build working throughout the process
- Update documentation as we go

## Rollback Plan

If issues arise:
1. Git revert to previous commit
2. Address specific issues
3. Re-attempt migration in smaller chunks

## Success Criteria

- [ ] All files organized according to new structure
- [ ] No broken imports
- [ ] Build succeeds without errors
- [ ] All tests pass
- [ ] No duplicate code
- [ ] Clear barrel exports for all modules
- [ ] Updated documentation
