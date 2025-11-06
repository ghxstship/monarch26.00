# Production Deployment Checklist
**Project:** GHXSTSHIP Industries Website  
**Date:** January 6, 2025

---

## PRE-DEPLOYMENT REQUIREMENTS

### 1. Environment Setup
- [ ] Create production PostgreSQL database
- [ ] Configure DATABASE_URL in production environment
- [ ] Set up Resend account and get API key
- [ ] Configure all environment variables in hosting platform
- [ ] Generate secure JWT secrets
- [ ] Set up custom domain DNS records

### 2. Database Configuration
```bash
# Local setup first
cp .env.example .env.local

# Edit .env.local with:
DATABASE_URL="postgresql://user:password@localhost:5432/ghxstship"
RESEND_API_KEY="re_your_key_here"
JWT_SECRET="generate-secure-secret"
NEXT_PUBLIC_SITE_URL="https://ghxstship.com"

# Run migrations
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 3. Testing Verification
- [ ] Run unit tests: `npm run test`
- [ ] Run E2E tests: `npm run test:e2e`
- [ ] Run type checking: `npm run typecheck`
- [ ] Run linting: `npm run lint`
- [ ] Build verification: `npm run build`
- [ ] Manual testing of all API endpoints
- [ ] Manual testing of all forms
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness testing (iOS, Android)

### 4. Security Audit
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Verify all secrets are in environment variables (not code)
- [ ] Test rate limiting on API endpoints
- [ ] Verify CORS configuration
- [ ] Test CSP headers
- [ ] Verify HTTPS enforcement
- [ ] Test input validation on all forms
- [ ] Verify SQL injection prevention
- [ ] Test XSS prevention

### 5. Performance Optimization
- [ ] Run Lighthouse audit (target: 90+ all metrics)
- [ ] Optimize images (WebP/AVIF format)
- [ ] Enable compression
- [ ] Configure CDN for static assets
- [ ] Test load time on 3G connection
- [ ] Verify lazy loading implementation
- [ ] Check bundle size
- [ ] Test Core Web Vitals

### 6. SEO Configuration
- [ ] Verify meta tags on all pages
- [ ] Generate sitemap.xml
- [ ] Configure robots.txt
- [ ] Set up Google Search Console
- [ ] Verify Open Graph images
- [ ] Test social media sharing
- [ ] Verify structured data (Schema.org)
- [ ] Check canonical URLs

### 7. Accessibility Compliance
- [ ] Run axe DevTools audit
- [ ] Test keyboard navigation
- [ ] Test with screen reader (NVDA/JAWS/VoiceOver)
- [ ] Verify color contrast ratios
- [ ] Test focus indicators
- [ ] Verify ARIA labels
- [ ] Test with reduced motion preference
- [ ] Verify touch target sizes (min 44x44px)

---

## DEPLOYMENT STEPS

### Option A: Vercel Deployment (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Link project
vercel link

# 4. Configure environment variables
vercel env add DATABASE_URL production
vercel env add RESEND_API_KEY production
vercel env add JWT_SECRET production
# ... add all other env vars

# 5. Deploy to production
vercel --prod
```

### Option B: Manual Deployment

```bash
# 1. Build application
npm run build

# 2. Set up production server (Ubuntu/Debian)
# Install Node.js, PostgreSQL, Nginx

# 3. Configure Nginx reverse proxy
# 4. Set up PM2 for process management
# 5. Configure SSL with Let's Encrypt
# 6. Set up database backups
```

---

## POST-DEPLOYMENT VERIFICATION

### Immediate Checks (Within 1 hour)
- [ ] Site loads successfully at production URL
- [ ] All pages accessible
- [ ] Contact form submits successfully
- [ ] Newsletter signup works
- [ ] Projects API returns data
- [ ] Images load correctly
- [ ] Navigation works on mobile
- [ ] SSL certificate valid
- [ ] No console errors
- [ ] Analytics tracking works

### 24-Hour Monitoring
- [ ] Check error logs
- [ ] Monitor API response times
- [ ] Verify email delivery
- [ ] Check database performance
- [ ] Monitor server resources (CPU, memory)
- [ ] Verify backup completion
- [ ] Check uptime monitoring alerts

### Week 1 Monitoring
- [ ] Review analytics data
- [ ] Check form submission volume
- [ ] Monitor error rates
- [ ] Review performance metrics
- [ ] Check SEO indexing status
- [ ] Monitor user feedback
- [ ] Review security logs

---

## ROLLBACK PLAN

### If Critical Issues Arise:

```bash
# Vercel rollback
vercel rollback

# Or manual rollback
git revert HEAD
git push origin main
vercel --prod
```

### Emergency Contacts:
- **Technical Lead:** [Name/Email]
- **DevOps:** [Name/Email]
- **Hosting Support:** Vercel Support / AWS Support

---

## MONITORING SETUP

### Required Integrations:

1. **Error Tracking**
   ```bash
   npm install @sentry/nextjs
   # Configure Sentry DSN
   ```

2. **Analytics**
   - Google Analytics or Plausible
   - Configure tracking ID
   - Verify events firing

3. **Uptime Monitoring**
   - UptimeRobot or Pingdom
   - Set up alerts for downtime
   - Configure status page

4. **Performance Monitoring**
   - Vercel Analytics
   - Or New Relic / Datadog
   - Set up performance budgets

---

## BACKUP & DISASTER RECOVERY

### Database Backups
```bash
# Daily automated backups
# Retention: 30 days
# Location: S3 or similar

# Manual backup command
pg_dump ghxstship > backup_$(date +%Y%m%d).sql
```

### Recovery Procedure
1. Identify issue and scope
2. Notify stakeholders
3. Execute rollback if needed
4. Restore database from backup
5. Verify functionality
6. Document incident

---

## MAINTENANCE SCHEDULE

### Daily
- [ ] Check error logs
- [ ] Monitor uptime
- [ ] Review form submissions

### Weekly
- [ ] Review analytics
- [ ] Check for dependency updates
- [ ] Review security advisories
- [ ] Database performance check

### Monthly
- [ ] Full security audit
- [ ] Performance optimization review
- [ ] Backup restoration test
- [ ] Update dependencies
- [ ] Review and update documentation

---

## COMPLIANCE CHECKLIST

### GDPR (if applicable)
- [ ] Privacy policy published
- [ ] Cookie consent banner
- [ ] Data export functionality
- [ ] Data deletion functionality
- [ ] Data processing agreements

### CCPA (if applicable)
- [ ] "Do Not Sell" link present
- [ ] Data disclosure available
- [ ] Opt-out mechanism working

### Accessibility
- [ ] WCAG 2.1 AA compliant
- [ ] Accessibility statement published
- [ ] Contact for accessibility issues

---

## SUCCESS CRITERIA

### Technical Metrics
- ✅ Uptime: 99.9%+
- ✅ Page load time: < 3 seconds
- ✅ API response time: < 200ms
- ✅ Error rate: < 0.1%
- ✅ Lighthouse score: 90+ all metrics

### Business Metrics
- ✅ Contact form submissions working
- ✅ Newsletter signups working
- ✅ Zero critical bugs
- ✅ Positive user feedback
- ✅ SEO indexing complete

---

## SIGN-OFF

**Deployment Approved By:**
- [ ] Technical Lead: _________________ Date: _______
- [ ] Project Manager: ________________ Date: _______
- [ ] QA Lead: _______________________ Date: _______
- [ ] Stakeholder: ____________________ Date: _______

**Deployment Date:** _________________  
**Deployed By:** _________________  
**Deployment Status:** ⬜ Success ⬜ Issues ⬜ Rolled Back

**Notes:**
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
