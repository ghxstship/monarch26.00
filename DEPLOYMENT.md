# GHXSTSHIP Industries - Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier works)
- Node.js 18+ installed locally

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: GHXSTSHIP Industries website"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/ghxstship-website.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** .next
5. Add environment variables (optional):
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_ANALYTICS_ID`
   - etc. (see .env.example)
6. Click "Deploy"

Your site will be live in ~2 minutes at `your-project.vercel.app`

### Step 3: Custom Domain

1. In Vercel dashboard, go to Project Settings → Domains
2. Add your custom domain (e.g., `ghxstship.com`)
3. Follow DNS configuration instructions
4. SSL certificate is automatically provisioned

## 📦 Manual Deployment

### Build for Production

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Test production build locally
npm start
```

### Deploy to Other Platforms

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=.next
```

#### AWS Amplify
1. Connect your GitHub repository
2. Set build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
3. Deploy

#### Docker
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]
```

## ⚙️ Environment Variables

Create a `.env.local` file for local development:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values.

### Required Variables
- `NEXT_PUBLIC_SITE_URL` - Your production URL

### Optional Variables
- `NEXT_PUBLIC_ANALYTICS_ID` - Google Analytics or Plausible ID
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity CMS project ID (if using CMS)
- `NEXT_PUBLIC_FORM_ENDPOINT` - Form submission endpoint
- `NEXT_PUBLIC_CALENDLY_URL` - Calendly booking URL

## 🔍 Pre-Deployment Checklist

### Content
- [ ] Replace placeholder images with actual B&W images
- [ ] Update company contact information
- [ ] Add real project case studies
- [ ] Verify all links work
- [ ] Proofread all copy

### Technical
- [ ] Test all pages on mobile, tablet, desktop
- [ ] Verify forms submit correctly
- [ ] Test navigation and mobile menu
- [ ] Check page load times
- [ ] Run Lighthouse audit (target: 90+ all metrics)
- [ ] Test keyboard navigation
- [ ] Verify focus states on all interactive elements

### SEO
- [ ] Update meta titles and descriptions
- [ ] Add Open Graph images (B&W versions)
- [ ] Generate sitemap.xml
- [ ] Configure robots.txt
- [ ] Submit sitemap to Google Search Console

### Analytics
- [ ] Set up analytics tracking
- [ ] Configure goal tracking
- [ ] Test analytics events

## 📊 Performance Optimization

### Image Optimization
```bash
# Convert images to B&W using Sharp
npm run process-images
```

### Bundle Analysis
```bash
# Analyze bundle size
npm run analyze
```

### Caching Strategy
- Static assets: 1 year cache
- API routes: No cache
- Pages: ISR with 60s revalidation

## 🔒 Security

### Headers Configuration
Add to `next.config.ts`:

```typescript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
      ],
    },
  ];
}
```

## 📈 Monitoring

### Recommended Tools
- **Vercel Analytics** - Built-in performance monitoring
- **Sentry** - Error tracking
- **Plausible** - Privacy-friendly analytics
- **Uptime Robot** - Uptime monitoring

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Images Not Loading
- Verify image paths are correct
- Check Next.js image domains configuration
- Ensure images are in `/public` directory

### Fonts Not Loading
- Fonts are loaded from Google Fonts automatically
- Check network tab for font loading errors
- Verify font names in `app/layout.tsx`

## 📞 Support

For deployment issues:
- Email: hello@ghxstship.com
- Check Next.js documentation: https://nextjs.org/docs
- Vercel support: https://vercel.com/support

---

**Ready to disrupt the industry? Deploy with confidence.**
