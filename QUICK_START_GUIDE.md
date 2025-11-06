# GHXSTSHIP Website - Quick Start Guide
**Get Your Enterprise Website Running in 30 Minutes**

---

## 🚀 IMMEDIATE NEXT STEPS

### Step 1: Database Setup (10 minutes)

```bash
# Install PostgreSQL (if not already installed)
# macOS:
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb ghxstship

# Navigate to project
cd ghxstship-website

# Copy environment file
cp .env.example .env.local

# Edit .env.local and add:
DATABASE_URL="postgresql://YOUR_USERNAME@localhost:5432/ghxstship"
```

### Step 2: Run Migrations (2 minutes)

```bash
# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed sample data
npm run prisma:seed
```

### Step 3: Email Service Setup (5 minutes)

```bash
# 1. Go to https://resend.com and sign up
# 2. Get your API key
# 3. Add to .env.local:
RESEND_API_KEY="re_your_api_key_here"
EMAIL_FROM_ADDRESS="hello@ghxstship.com"
CONTACT_EMAIL="hello@ghxstship.com"
```

### Step 4: Start Development Server (1 minute)

```bash
# Start the server
npm run dev

# Open browser to http://localhost:3000
```

### Step 5: Test API Endpoints (5 minutes)

```bash
# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message",
    "formType": "GENERAL_INQUIRY"
  }'

# Test projects API
curl http://localhost:3000/api/projects

# Test newsletter
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User"
  }'
```

### Step 6: Run Tests (5 minutes)

```bash
# Run unit tests
npm run test

# Run type checking
npm run typecheck

# Run linting
npm run lint
```

---

## 🎯 VERIFY EVERYTHING WORKS

### Checklist:
- [ ] Database connected (no Prisma errors)
- [ ] Development server running
- [ ] Homepage loads at http://localhost:3000
- [ ] Contact form API responds
- [ ] Projects API returns data
- [ ] No console errors
- [ ] Tests pass

---

## 🔧 TROUBLESHOOTING

### Database Connection Issues
```bash
# Check PostgreSQL is running
brew services list | grep postgresql

# Restart if needed
brew services restart postgresql@15

# Verify connection
psql -d ghxstship -c "SELECT 1"
```

### Prisma Issues
```bash
# Reset database if needed
npm run db:reset

# Regenerate client
npm run prisma:generate
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

---

## 📦 WHAT'S INCLUDED

### Database
- ✅ Complete schema with 15+ tables
- ✅ Sample projects and blog posts
- ✅ System settings configured

### API Endpoints
- ✅ `/api/contact` - Contact form handler
- ✅ `/api/newsletter/subscribe` - Newsletter signup
- ✅ `/api/projects` - Project listing with filters
- ✅ `/api/projects/[slug]` - Individual project

### Security
- ✅ Rate limiting
- ✅ Input validation
- ✅ Security headers
- ✅ CORS configuration

### Testing
- ✅ Vitest for unit tests
- ✅ Playwright for E2E tests
- ✅ Sample test suites

---

## 🚢 DEPLOY TO STAGING

### Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Add environment variables
vercel env add DATABASE_URL production
vercel env add RESEND_API_KEY production
vercel env add JWT_SECRET production
vercel env add NEXT_PUBLIC_SITE_URL production

# Deploy
vercel --prod
```

### Environment Variables Needed:
```
DATABASE_URL=postgresql://...
RESEND_API_KEY=re_...
JWT_SECRET=your-secret-here
JWT_REFRESH_SECRET=your-refresh-secret
SESSION_SECRET=your-session-secret
NEXT_PUBLIC_SITE_URL=https://your-domain.com
EMAIL_FROM_ADDRESS=hello@ghxstship.com
CONTACT_EMAIL=hello@ghxstship.com
```

---

## 📚 DOCUMENTATION

### Full Documentation Available:
- `/audits/2025-01-06/audit-log.md` - Complete audit findings
- `/audits/2025-01-06/IMPLEMENTATION_SUMMARY.md` - What was built
- `/audits/2025-01-06/DEPLOYMENT_CHECKLIST.md` - Deployment guide
- `/AUDIT_COMPLETION_REPORT.md` - Executive summary
- `README.md` - Project overview

### Key Files to Know:
- `prisma/schema.prisma` - Database schema
- `lib/validations.ts` - Validation schemas
- `lib/email.ts` - Email service
- `lib/db.ts` - Database client
- `middleware.ts` - Security middleware
- `app/api/*` - API endpoints

---

## 💡 TIPS

### Development Workflow
1. Make changes to code
2. Run `npm run typecheck` to verify types
3. Run `npm run lint` to check code style
4. Run `npm run test` to verify functionality
5. Test manually in browser
6. Commit changes

### Database Changes
1. Edit `prisma/schema.prisma`
2. Run `npm run prisma:migrate` to create migration
3. Run `npm run prisma:generate` to update client
4. Restart dev server

### Adding New API Endpoints
1. Create file in `app/api/[endpoint]/route.ts`
2. Add validation schema in `lib/validations.ts`
3. Implement GET/POST/PUT/DELETE handlers
4. Add tests in `tests/api/`
5. Update documentation

---

## 🎉 YOU'RE READY!

Your enterprise-grade website infrastructure is now running locally.

### What You Can Do Now:
- ✅ Test contact form submissions
- ✅ View sample projects
- ✅ Subscribe to newsletter
- ✅ Explore the database with Prisma Studio: `npm run prisma:studio`
- ✅ Run the full test suite
- ✅ Deploy to staging

### Next Steps:
1. Complete frontend integration
2. Add remaining pages
3. Run accessibility audit
4. Deploy to production

---

## 📞 NEED HELP?

### Common Commands:
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run test             # Run tests
npm run prisma:studio    # Open database GUI
npm run lint             # Check code style
npm run typecheck        # Verify TypeScript
```

### Resources:
- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- Resend Docs: https://resend.com/docs
- Vercel Docs: https://vercel.com/docs

---

**Everything is ready. Start building! 🚀**
