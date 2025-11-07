# Emergency Fix Guide - GHXSTSHIP Website
## Get the Application Building in 4-6 Hours

**Date**: November 6, 2025  
**Priority**: 🚨 CRITICAL  
**Estimated Time**: 4-6 hours

---

## ⚡ Quick Start

This guide will get your application building and deployable. Follow steps in order.

---

## Step 1: Fix Async Params (2-3 hours)

Next.js 16 changed `params` from object to Promise. We need to update 12 route handlers.

### Pattern to Apply

**BEFORE** (broken):
```typescript
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await service.get(params.id);
  // ...
}
```

**AFTER** (fixed):
```typescript
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await service.get(id);
  // ...
}
```

### Files to Fix

Run this command to see all files that need fixing:
```bash
cd ghxstship-website
find app/api -name "route.ts" -path "*\[*\]*"
```

### Fix Each File

#### 1. `/app/api/blog/[id]/route.ts`

```typescript
// Fix GET handler
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await blogService.getPost(id);
    // ... rest unchanged
  }
}

// Fix PUT handler (with auth middleware)
export const PUT = withEditor(async (
  request: NextRequest,
  user,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = updateBlogSchema.parse(body);
    const post = await blogService.updatePost(id, data, user.id);
    // ... rest unchanged
  }
});

// Fix DELETE handler
export const DELETE = withEditor(async (
  request: NextRequest,
  user,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    await blogService.deletePost(id, user.id);
    // ... rest unchanged
  }
});
```

#### 2. `/app/api/blog/[id]/publish/route.ts`

```typescript
export const POST = withEditor(async (
  request: NextRequest,
  user,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const post = await blogService.publishPost(id, user.id);
    // ... rest unchanged
  }
});
```

#### 3. `/app/api/blog/[id]/related/route.ts`

```typescript
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const relatedPosts = await blogService.getRelatedPosts(id);
    // ... rest unchanged
  }
}
```

#### 4. `/app/api/projects/[id]/route.ts`

Same pattern as blog routes - update GET, PUT, DELETE handlers.

#### 5. `/app/api/projects/[id]/publish/route.ts`

Same pattern as blog publish route.

#### 6. `/app/api/projects/[id]/images/route.ts`

```typescript
export const POST = withEditor(async (
  request: NextRequest,
  user,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    // ... rest unchanged
  }
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // ... rest unchanged
  }
}
```

#### 7. `/app/api/projects/[id]/images/[imageId]/route.ts`

```typescript
export const DELETE = withEditor(async (
  request: NextRequest,
  user,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) => {
  try {
    const { id, imageId } = await params;
    // ... rest unchanged
  }
});
```

#### 8. `/app/api/projects/[slug]/route.ts`

```typescript
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    // ... rest unchanged
  }
}
```

#### 9. `/app/api/media/[id]/route.ts`

```typescript
export const DELETE = withEditor(async (
  request: NextRequest,
  user,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    // ... rest unchanged
  }
});
```

#### 10. `/app/api/media/[id]/signed-url/route.ts`

```typescript
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // ... rest unchanged
  }
}
```

#### 11. `/app/api/users/[id]/route.ts`

Same pattern - update GET, PUT, DELETE handlers.

#### 12. `/app/api/users/[id]/role/route.ts`

```typescript
export const PUT = withAdmin(async (
  request: NextRequest,
  user,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    // ... rest unchanged
  }
});
```

### Verify Step 1

```bash
npm run typecheck 2>&1 | grep "params"
```

Should show fewer errors related to params.

---

## Step 2: Fix Prisma Schema (1-2 hours)

### Update `prisma/schema.prisma`

Add missing fields and fix enums:

```prisma
model User {
  id                      String    @id @default(cuid())
  email                   String    @unique
  emailVerified           DateTime?
  emailVerificationToken  String?   // ADD THIS
  passwordHash            String?
  name                    String?
  avatar                  String?
  role                    UserRole  @default(VIEWER)
  status                  UserStatus @default(ACTIVE)
  lastFailedLogin         DateTime? // ADD THIS
  failedLoginAttempts     Int       @default(0)
  accountLockedUntil      DateTime?
  
  // ... rest of fields unchanged
}

model Session {
  id            String   @id @default(cuid())
  userId        String
  token         String   @unique
  refreshToken  String?  @unique
  expiresAt     DateTime
  revokedAt     DateTime? // ADD THIS
  ipAddress     String?
  userAgent     String?
  createdAt     DateTime @default(now())
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([token])
}

model ActivityLog {
  id          String   @id @default(cuid())
  userId      String?
  action      String   // ADD THIS
  entityType  String
  entityId    String?
  metadata    Json?
  ipAddress   String?
  userAgent   String?
  createdAt   DateTime @default(now())
  
  user User? @relation(fields: [userId], references: [id], onDelete: SetNull)
  
  @@index([userId])
  @@index([entityType, entityId])
  @@index([createdAt])
}

model BlogPost {
  id            String         @id @default(cuid())
  slug          String         @unique
  title         String
  excerpt       String
  content       String         @db.Text
  category      String?
  tags          String[]
  featuredImage String?
  featured      Boolean        @default(false)
  status        BlogPostStatus @default(DRAFT)
  views         Int            @default(0) // ADD THIS
  publishedAt   DateTime?
  metadata      Json?
  authorId      String
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  
  author   User      @relation(fields: [authorId], references: [id])
  comments Comment[]
  
  @@index([slug])
  @@index([authorId])
  @@index([status])
  @@index([publishedAt])
}

model PasswordReset {
  id        String   @id @default(cuid())
  email     String   // Keep this, don't change to userId
  token     String   @unique
  expiresAt DateTime
  usedAt    DateTime?
  createdAt DateTime @default(now())
  
  @@index([email])
  @@index([token])
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
  PENDING    // ADD THIS
}

enum BlogPostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

// ... rest of schema unchanged
```

### Apply Changes

```bash
cd ghxstship-website

# Generate Prisma Client with new types
npx prisma generate

# Create migration
npx prisma migrate dev --name fix-schema-mismatch

# If you get errors about existing database, you may need to:
# npx prisma migrate reset  # WARNING: This deletes all data!
```

### Verify Step 2

```bash
npm run typecheck 2>&1 | grep -E "(lastFailedLogin|revokedAt|emailVerificationToken|action|views|PENDING)"
```

Should show no errors for these fields.

---

## Step 3: Install Missing Types (15 minutes)

```bash
cd ghxstship-website

npm install --save-dev @types/jsonwebtoken @types/bcryptjs

# Verify installation
npm list @types/jsonwebtoken @types/bcryptjs
```

---

## Step 4: Fix Middleware Warning (30 minutes)

### Option A: Rename to Proxy (Recommended)

```bash
cd ghxstship-website
mv middleware.ts proxy.ts
```

Then update `next.config.ts`:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    proxyTimeout: 60000,
  },
};

export default nextConfig;
```

### Option B: Suppress Warning

Update `next.config.ts`:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Suppress middleware deprecation warning
  webpack: (config) => {
    config.infrastructureLogging = {
      level: 'error',
    };
    return config;
  },
};

export default nextConfig;
```

---

## Step 5: Verify Build (15 minutes)

### Run All Checks

```bash
cd ghxstship-website

# 1. Type check
echo "Running type check..."
npm run typecheck
# Should complete with 0 errors

# 2. Lint
echo "Running lint..."
npm run lint
# Should complete with 0 errors

# 3. Build
echo "Running build..."
npm run build
# Should complete successfully

# 4. Check build output
echo "Build completed! Checking output..."
ls -la .next/
```

### Expected Output

```
✓ Compiled successfully in X.Xs
✓ Linting and checking validity of types
✓ Creating an optimized production build
✓ Compiled successfully

Route (app)                              Size     First Load JS
┌ ○ /                                    XXX kB        XXX kB
├ ○ /about                               XXX kB        XXX kB
├ ○ /admin                               XXX kB        XXX kB
...
○  (Static)  prerendered as static content
```

---

## Step 6: Test Locally (15 minutes)

```bash
# Start development server
npm run dev

# In another terminal, test endpoints
curl http://localhost:3000/api/health
# Should return: {"status":"ok","timestamp":"..."}

curl http://localhost:3000/api/projects
# Should return: {"success":true,"projects":[],"total":0}
```

---

## 🎉 Success Criteria

After completing all steps, you should have:

- ✅ `npm run typecheck` passes with 0 errors
- ✅ `npm run lint` passes with 0 errors  
- ✅ `npm run build` completes successfully
- ✅ Development server starts without errors
- ✅ API endpoints respond (even without database)
- ✅ No console errors in browser

---

## 🚀 Next Steps

Once the build is working:

1. **Set up database** (see main audit report)
2. **Deploy to staging** (Vercel/Netlify)
3. **Test all endpoints** with real database
4. **Begin admin dashboard work**

---

## 🆘 Troubleshooting

### Build still failing?

```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try build again
npm run build
```

### TypeScript errors persist?

```bash
# Regenerate Prisma types
npx prisma generate

# Restart TypeScript server in your IDE
# VS Code: Cmd+Shift+P -> "TypeScript: Restart TS Server"
```

### Database migration fails?

```bash
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Or create new migration
npx prisma migrate dev --name your-migration-name
```

---

## 📞 Need Help?

If you encounter issues:

1. Check the error message carefully
2. Search for the error in Next.js 16 migration guide
3. Verify all files were updated correctly
4. Check that Prisma schema matches your database

---

**Time to Complete**: 4-6 hours  
**Difficulty**: Medium  
**Impact**: Critical - Unblocks all other work

**Good luck! 🚀**
