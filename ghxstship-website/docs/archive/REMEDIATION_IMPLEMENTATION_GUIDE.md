# Remediation Implementation Guide
## Step-by-Step Instructions to Achieve 100% Compliance

**Based on**: Full Stack Audit Report - November 6, 2025  
**Target**: 100% Production Readiness in 6-7 weeks

---

## SPRINT 1: FOUNDATION (Weeks 1-2)

### Week 1: Database & Authentication

#### Day 1-2: Database Setup

```bash
# 1. Initialize Prisma migrations
cd ghxstship-website
npx prisma migrate dev --name init

# 2. Generate Prisma client
npx prisma generate

# 3. Create seed data
npx prisma db seed

# 4. Verify database
npx prisma studio
```

**Create** `/prisma/migrations/` directory with initial migration

#### Day 3-4: Authentication Service

**Create** `/lib/services/AuthService.ts`:
```typescript
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/db';

export class AuthService {
  async register(email: string, password: string, name: string) {
    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);
    
    // Create user
    const user = await prisma.user.create({
      data: { email, passwordHash, name, role: 'VIEWER' }
    });
    
    // Send verification email
    await this.sendVerificationEmail(user.email);
    
    return user;
  }
  
  async login(email: string, password: string) {
    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) throw new Error('Invalid credentials');
    
    // Verify password
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error('Invalid credentials');
    
    // Generate tokens
    const token = this.generateToken(user);
    const refreshToken = this.generateRefreshToken(user);
    
    // Create session
    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        refreshToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
      }
    });
    
    return { user, token, refreshToken };
  }
  
  private generateToken(user: any) {
    return jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );
  }
  
  private generateRefreshToken(user: any) {
    return jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    );
  }
}
```

**Install dependencies**:
```bash
npm install bcryptjs jsonwebtoken
npm install --save-dev @types/bcryptjs @types/jsonwebtoken
```

#### Day 5: Authentication Endpoints

**Create** `/app/api/auth/register/route.ts`
**Create** `/app/api/auth/login/route.ts`
**Create** `/app/api/auth/logout/route.ts`
**Create** `/app/api/auth/refresh/route.ts`
**Create** `/app/api/auth/forgot-password/route.ts`
**Create** `/app/api/auth/reset-password/route.ts`
**Create** `/app/api/auth/verify-email/route.ts`

### Week 2: Authorization & User Management

#### Day 6-7: RBAC Middleware

**Create** `/lib/middleware/auth.ts`:
```typescript
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/db';

export async function requireAuth(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) throw new Error('Unauthorized');
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
  const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
  
  if (!user || user.status !== 'ACTIVE') throw new Error('Unauthorized');
  
  return user;
}

export async function requireRole(request: NextRequest, roles: string[]) {
  const user = await requireAuth(request);
  if (!roles.includes(user.role)) throw new Error('Forbidden');
  return user;
}
```

#### Day 8-9: User Management Endpoints

**Create** `/app/api/users/me/route.ts`
**Create** `/app/api/users/route.ts`
**Create** `/app/api/users/[id]/route.ts`
**Create** `/app/api/users/[id]/role/route.ts`

**Create** `/lib/services/UserService.ts`

#### Day 10: Admin Dashboard

**Create** `/app/admin/layout.tsx`
**Create** `/app/admin/page.tsx`
**Create** `/app/admin/users/page.tsx`
**Create** `/app/admin/projects/page.tsx`

---

## SPRINT 2: CONTENT MANAGEMENT (Weeks 3-4)

### Week 3: Project & Blog Management

#### Day 11-12: Project Management

**Create** `/lib/services/ProjectService.ts`
**Create** `/app/api/projects/route.ts` (POST)
**Create** `/app/api/projects/[slug]/route.ts` (PUT, DELETE)
**Create** `/app/api/projects/[slug]/publish/route.ts`
**Create** `/app/api/projects/[slug]/images/route.ts`

#### Day 13-14: Blog Management

**Create** `/lib/services/BlogService.ts`
**Create** `/app/api/blog/route.ts`
**Create** `/app/api/blog/[slug]/route.ts`
**Create** `/app/api/blog/[slug]/publish/route.ts`

#### Day 15: Admin UI

**Create** `/app/admin/projects/new/page.tsx`
**Create** `/app/admin/projects/[slug]/edit/page.tsx`
**Create** `/app/admin/blog/page.tsx`
**Create** `/app/admin/blog/new/page.tsx`

### Week 4: Media & File Management

#### Day 16-17: AWS S3 Setup

```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

**Create** `/lib/services/StorageService.ts`:
```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class StorageService {
  private s3: S3Client;
  
  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
      }
    });
  }
  
  async uploadFile(file: File, path: string) {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: path,
      Body: await file.arrayBuffer(),
      ContentType: file.type
    });
    
    await this.s3.send(command);
    return `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${path}`;
  }
  
  async getSignedUrl(key: string, expiresIn = 3600) {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key
    });
    
    return await getSignedUrl(this.s3, command, { expiresIn });
  }
}
```

#### Day 18-19: Media Endpoints

**Create** `/app/api/media/upload/route.ts`
**Create** `/app/api/media/route.ts`
**Create** `/app/api/media/[id]/route.ts`

**Create** `/lib/services/MediaService.ts`

#### Day 20: Media Library UI

**Create** `/app/admin/media/page.tsx`
**Create** `/components/admin/MediaLibrary.tsx`
**Create** `/components/admin/FileUploader.tsx`

---

## SPRINT 3: TESTING (Week 5)

### Day 21-22: Unit Tests

**Create test files**:
- `/tests/services/AuthService.test.ts`
- `/tests/services/UserService.test.ts`
- `/tests/services/ProjectService.test.ts`
- `/tests/services/BlogService.test.ts`
- `/tests/lib/validations.test.ts`

```bash
npm run test:coverage
# Target: 80%+ coverage
```

### Day 23: Integration Tests

**Create** `/tests/api/auth.test.ts`
**Create** `/tests/api/users.test.ts`
**Create** `/tests/api/projects.test.ts`

### Day 24: E2E Tests

**Fix Playwright configuration**:
```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'npm run dev',
    port: 3000,
  },
});
```

**Create** `/tests/e2e/auth.spec.ts`
**Create** `/tests/e2e/admin.spec.ts`

### Day 25: Component Tests & Error Boundaries

**Create** `/components/ErrorBoundary.tsx`
**Update** `/app/layout.tsx` to wrap with ErrorBoundary

**Create component tests**:
- `/tests/components/Header.test.tsx`
- `/tests/components/Footer.test.tsx`
- `/tests/components/Modal.test.tsx`

---

## SPRINT 4: DEVOPS (Week 6)

### Day 26: CI/CD Pipeline

**Create** `/.github/workflows/ci.yml`:
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test
      - run: npm run build

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel Staging
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### Day 27-28: Database Hosting

**Option 1: Vercel Postgres**
```bash
vercel postgres create
```

**Option 2: AWS RDS**
- Create PostgreSQL instance
- Configure security groups
- Set DATABASE_URL environment variable

**Configure automated backups**

### Day 29: Application Hosting

**Deploy to Vercel**:
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Configure environment variables** in Vercel dashboard

### Day 30: Monitoring & Logging

**Initialize Sentry**:
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

**Configure CloudWatch or Datadog**:
```typescript
// lib/logger.ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

---

## SPRINT 5: COMPLIANCE & POLISH (Week 7)

### Day 31: GDPR Features

**Create** `/app/api/users/me/export/route.ts`:
```typescript
export async function GET(request: NextRequest) {
  const user = await requireAuth(request);
  
  // Export all user data
  const data = {
    user: await prisma.user.findUnique({ where: { id: user.id } }),
    projects: await prisma.project.findMany({ where: { authorId: user.id } }),
    comments: await prisma.comment.findMany({ where: { userId: user.id } }),
    // ... all related data
  };
  
  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="user-data.json"'
    }
  });
}
```

**Create** `/app/api/users/me/delete/route.ts` with full data purge

### Day 32: CSRF Protection

```bash
npm install csrf
```

**Update middleware** to include CSRF tokens

### Day 33: Analytics Integration

```typescript
// lib/analytics.ts
import { AnalyticsService } from './services/AnalyticsService';

export const analytics = new AnalyticsService();

// Track page view
export function trackPageView(path: string) {
  analytics.trackEvent({
    eventType: 'PAGE_VIEW',
    eventName: 'page_view',
    path
  });
}
```

**Add to** `/app/layout.tsx`

### Day 34: API Documentation

```bash
npm install swagger-jsdoc swagger-ui-react
```

**Create** `/app/api/docs/route.ts`
**Create** `/app/api-docs/page.tsx`

### Day 35: Final Testing & Launch

1. Run full test suite
2. Security audit
3. Performance testing
4. Load testing
5. Deploy to production
6. Monitor for 24 hours
7. Create incident response plan

---

## VERIFICATION CHECKLIST

After completing all sprints, verify:

- [ ] Database migrations applied
- [ ] All auth endpoints working
- [ ] RBAC enforced on protected routes
- [ ] Admin dashboard functional
- [ ] File upload working
- [ ] 80%+ test coverage
- [ ] CI/CD pipeline passing
- [ ] Production environment live
- [ ] Monitoring configured
- [ ] GDPR features working
- [ ] API documentation published
- [ ] SSL certificates valid
- [ ] Backups automated
- [ ] Error tracking active
- [ ] Performance metrics good

---

## MAINTENANCE PLAN

### Daily
- Monitor error logs
- Check uptime
- Review failed requests

### Weekly
- Review analytics
- Check test coverage
- Update dependencies

### Monthly
- Security audit
- Performance review
- Backup verification
- Documentation updates

### Quarterly
- Full penetration test
- Load testing
- Disaster recovery drill
- Architecture review

---

**Implementation Start**: Immediately  
**Target Completion**: 7 weeks from start  
**Production Launch**: Week 8
