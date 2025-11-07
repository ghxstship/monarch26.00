# Deployment Guide
## GHXSTSHIP Industries Website - Staging & Production

**Last Updated**: November 6, 2025  
**Status**: Ready for Staging Deployment

---

## PREREQUISITES

### Required Accounts
- [ ] Vercel account (or alternative hosting)
- [ ] PostgreSQL database (Vercel Postgres, AWS RDS, or Supabase)
- [ ] Resend account (email service)
- [ ] GitHub repository access

### Required Secrets
Generate secure secrets for production:
```bash
# Generate JWT secrets (32+ characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Run 3 times for JWT_SECRET, JWT_REFRESH_SECRET, SESSION_SECRET
```

---

## STEP 1: DATABASE SETUP

### Option A: Vercel Postgres (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Create Postgres database
vercel postgres create ghxstship-db

# Get connection string
vercel env pull .env.local
```

### Option B: AWS RDS

1. Create PostgreSQL instance in AWS RDS
2. Configure security groups to allow connections
3. Note connection string: `postgresql://user:password@host:5432/dbname`

### Option C: Supabase

1. Create project at supabase.com
2. Get connection string from project settings
3. Use "Connection Pooling" string for production

---

## STEP 2: ENVIRONMENT VARIABLES

Create `.env.local` in `ghxstship-website/`:

```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/ghxstship"

# Site Configuration
NEXT_PUBLIC_SITE_URL="https://ghxstship.com"
NEXT_PUBLIC_SITE_NAME="GHXSTSHIP Industries"
NODE_ENV="production"

# Authentication & Security (GENERATE NEW SECRETS!)
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters-long"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-minimum-32-characters"
SESSION_SECRET="your-super-secret-session-key-minimum-32-characters"

# Email Service
RESEND_API_KEY="re_xxxxxxxxxxxxx"
EMAIL_FROM_ADDRESS="hello@ghxstship.com"
CONTACT_EMAIL="hello@ghxstship.com"

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=""
NEXT_PUBLIC_GA_MEASUREMENT_ID=""

# Optional: Error Tracking
SENTRY_DSN=""
NEXT_PUBLIC_SENTRY_DSN=""

# Optional: File Storage
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_S3_BUCKET=""
AWS_REGION="us-east-1"
NEXT_PUBLIC_CDN_URL=""

# Rate Limiting
RATE_LIMIT_WINDOW_MS="60000"
RATE_LIMIT_MAX_REQUESTS="100"

# CORS
CORS_ORIGIN="*"
```

---

## STEP 3: DATABASE MIGRATION

```bash
cd ghxstship-website

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database with sample data
npx prisma db seed

# Verify database
npx prisma studio
```

---

## STEP 4: LOCAL TESTING

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test authentication endpoints
curl -X POST http://localhost:3000/api/health

# Test registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123","name":"Test User"}'

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'
```

---

## STEP 5: DEPLOY TO STAGING

### Using Vercel

```bash
# Link to Vercel project
vercel link

# Set environment variables in Vercel dashboard
# Or use CLI:
vercel env add DATABASE_URL production
vercel env add JWT_SECRET production
# ... add all environment variables

# Deploy to staging
vercel --env=preview

# Test staging deployment
curl https://your-staging-url.vercel.app/api/health
```

### Using Other Platforms

**Netlify**:
```bash
netlify deploy --prod
```

**AWS Amplify**:
- Connect GitHub repository
- Configure build settings
- Add environment variables
- Deploy

---

## STEP 6: VERIFY STAGING DEPLOYMENT

### Health Check
```bash
curl https://staging.ghxstship.com/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-06T...",
  "database": "connected",
  "uptime": "5 minutes",
  "memory": {
    "heapUsed": "50MB",
    "heapTotal": "100MB"
  },
  "version": "0.1.0",
  "environment": "production"
}
```

### Test Authentication Flow

1. **Register User**:
```bash
curl -X POST https://staging.ghxstship.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@ghxstship.com",
    "password": "SecurePassword123!",
    "name": "Admin User"
  }'
```

2. **Login**:
```bash
curl -X POST https://staging.ghxstship.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@ghxstship.com",
    "password": "SecurePassword123!"
  }'
```

3. **Get Profile** (use token from login):
```bash
curl https://staging.ghxstship.com/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

4. **Export Data** (GDPR):
```bash
curl https://staging.ghxstship.com/api/users/me/export \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -o user-data.json
```

---

## STEP 7: PRODUCTION DEPLOYMENT

### Pre-Production Checklist

- [ ] All staging tests passing
- [ ] Environment variables configured for production
- [ ] Database backups configured
- [ ] Monitoring and logging set up
- [ ] SSL certificates valid
- [ ] DNS configured
- [ ] Rate limiting tested
- [ ] Security headers verified
- [ ] GDPR features tested

### Deploy to Production

```bash
# Deploy to production
vercel --prod

# Or push to main branch (triggers CI/CD)
git checkout main
git merge develop
git push origin main
```

### Post-Deployment Verification

1. **Health Check**:
```bash
curl https://ghxstship.com/api/health
```

2. **Monitor Logs**:
```bash
vercel logs --prod
```

3. **Check Error Tracking** (if Sentry configured):
- Visit Sentry dashboard
- Verify no errors

4. **Performance Check**:
- Run Lighthouse audit
- Check Core Web Vitals
- Verify API response times

---

## STEP 8: CREATE ADMIN USER

After deployment, create an admin user via database or API:

### Option A: Via Database (Prisma Studio)

```bash
npx prisma studio --url="$DATABASE_URL"
```

1. Navigate to `users` table
2. Create new user with `role: "ADMIN"`
3. Set `status: "ACTIVE"`
4. Set `emailVerified: true`

### Option B: Via API + Database

1. Register user via API
2. Update role in database to "ADMIN"
3. Set status to "ACTIVE"

---

## MONITORING & MAINTENANCE

### Daily Checks
```bash
# Check health
curl https://ghxstship.com/api/health

# Check logs
vercel logs --prod --since=1h
```

### Weekly Tasks
- Review error logs
- Check database performance
- Monitor API response times
- Review security logs
- Check backup status

### Monthly Tasks
- Update dependencies
- Security audit
- Performance review
- Backup verification
- SSL certificate renewal check

---

## ROLLBACK PROCEDURE

If issues occur in production:

```bash
# Rollback to previous deployment
vercel rollback

# Or redeploy specific version
vercel deploy --prod --force
```

---

## TROUBLESHOOTING

### Database Connection Issues

```bash
# Test connection
npx prisma db execute --sql "SELECT 1"

# Check connection string
echo $DATABASE_URL
```

### Authentication Issues

- Verify JWT secrets are set correctly
- Check token expiration times
- Verify database sessions table

### Email Issues

- Verify RESEND_API_KEY is set
- Check email logs in Resend dashboard
- Verify sender email is verified

### Rate Limiting Issues

- Adjust RATE_LIMIT_MAX_REQUESTS
- Check IP forwarding headers
- Clear rate limit cache (restart server)

---

## SUPPORT CONTACTS

- **Hosting**: Vercel Support
- **Database**: Database provider support
- **Email**: Resend Support
- **DNS**: Domain registrar support

---

## NEXT STEPS AFTER DEPLOYMENT

1. **Monitor for 24 hours** - Watch for errors and performance issues
2. **Create admin user** - Set up initial admin account
3. **Test all features** - Verify authentication, GDPR, etc.
4. **Set up monitoring** - Configure Sentry, logging, alerts
5. **Document any issues** - Track and resolve deployment problems
6. **Begin content management development** - Start building admin UI

---

**Deployment Guide Version**: 1.0  
**Last Tested**: November 6, 2025  
**Status**: Staging Ready ✅
