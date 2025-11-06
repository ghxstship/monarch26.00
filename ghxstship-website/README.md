# GHXSTSHIP Industries Website

A full-stack immersive entertainment, experiential marketing, and creative media production agency website built with Next.js 14+, TypeScript, and Tailwind CSS.

## 🎨 Design Aesthetic

**Contemporary Minimal Pop Art** in pure black, white, and greyscale with bold geometric compositions and brutalist typography.

### Color Palette
- **Monochromatic Only**: Pure black (#000000), pure white (#FFFFFF), and greyscale tones
- **No Color**: Absolutely no hues beyond black/white/grey
- **High Contrast**: Alternating black and white backgrounds for maximum impact

### Typography System
- **Anton**: Hero headlines and main titles (400 weight)
- **Bebas Neue**: Section headers H2-H6 (400 weight)
- **Share Tech**: Body copy and descriptions (400 weight)
- **Share Tech Mono**: Metadata, labels, and technical info (400 weight)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Set up database
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📐 Project Structure

```
ghxstship-website/
├── app/                      # Next.js App Router pages
│   ├── about/               # About page
│   ├── contact/             # Contact page
│   ├── services/            # Services pages
│   ├── work/                # Work/Projects page
│   ├── layout.tsx           # Root layout with fonts
│   └── page.tsx             # Homepage
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Typography.tsx
│   ├── layout/              # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   ├── sections/            # Page sections
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Verticals.tsx
│   │   ├── FeaturedProjects.tsx
│   │   └── CTA.tsx
│   └── animations/          # Animation wrappers
│       ├── FadeIn.tsx
│       └── SlideUp.tsx
├── lib/                     # Utility functions
├── public/                  # Static assets
│   ├── images/
│   └── icons/
└── styles/
    └── globals.css          # Global styles
```

## 🎯 Key Features

### Implemented
- ✅ Full responsive design (mobile, tablet, desktop)
- ✅ Custom monochrome design system
- ✅ Typography hierarchy with 4 custom fonts
- ✅ Smooth animations with Framer Motion
- ✅ Homepage with Hero, Services (4 D's), Verticals, Projects, CTA
- ✅ About page with company story and stats
- ✅ Services overview page
- ✅ Work/Projects page with filtering
- ✅ Contact page with multi-step form
- ✅ Accessible navigation with mobile menu
- ✅ SEO-optimized metadata

### To Be Added
- [ ] CMS integration (Sanity/Contentful)
- [ ] Image processing for B&W conversion
- [ ] Individual service detail pages
- [ ] Individual project case studies
- [ ] Products pages (ATLVS, GVTEWAY)
- [ ] Blog/News section
- [ ] 3D geometric elements (Three.js)
- [ ] Advanced GSAP scroll animations
- [ ] Form submission backend
- [ ] Analytics integration

## 🏢 Company Information

**Legal Name:** GHXSTSHIP Industries LLC  
**DBA:** GHXSTSHIP  
**Headquarters:** Tampa, FL  
**Team:** Global Remote  
**Founded:** December 2022 (Legally organized July 2023)

### Core Verticals
1. Immersive Entertainment
2. Experiential Marketing
3. Creative Media
4. Integrated Technology

### The 4 D's Framework
1. **DESIGN** - Conceptual development & creative strategy
2. **DEVELOPMENT** - Build, fabricate, produce
3. **DIRECTION** - Execute, manage, deliver
4. **DISRUPTION** - Push boundaries, create the future

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion + GSAP
- **Fonts:** Google Fonts (Anton, Bebas Neue, Share Tech, Share Tech Mono)
- **Image Processing:** Sharp
- **Forms:** React Hook Form
- **State Management:** TanStack Query (React Query)

### Backend
- **Database:** PostgreSQL with Prisma ORM
- **API:** Next.js API Routes
- **Validation:** Zod
- **Email:** Resend
- **Authentication:** JWT (ready for implementation)

### Testing
- **Unit/Integration:** Vitest + Testing Library
- **E2E:** Playwright
- **Coverage:** V8

### DevOps
- **Hosting:** Vercel (recommended)
- **CI/CD:** GitHub Actions (to be configured)
- **Monitoring:** Ready for Sentry integration

## 📱 Pages

- **/** - Homepage with full experience
- **/about** - Company story, mission, vision, stats
- **/services** - The 4 D's framework overview
- **/work** - Project portfolio with filtering
- **/contact** - Multi-step contact form
- **/verticals** - (To be built)
- **/products** - (To be built)

## 🎨 Design Guidelines

### What to DO
✅ Use pure black and white as primary colors  
✅ Convert ALL images to high-contrast B&W  
✅ Use massive typography (120px+ for heroes)  
✅ Create geometric compositions  
✅ Implement halftone patterns for texture  
✅ Use thick borders (2-3px)  
✅ Hard cuts and wipes for transitions  
✅ Invert colors on hover  
✅ Bold, uppercase typography for headers  

### What NOT to DO
❌ NO COLOR - no hues beyond black/white/grey  
❌ No soft shadows or blurs  
❌ No gradients (except halftone)  
❌ No subtle fades  
❌ No organic shapes  
❌ No small typography  

## ♿ Accessibility

- WCAG 2.1 AA compliant design
- Keyboard navigation support
- Focus indicators on all interactive elements
- Semantic HTML structure
- Reduced motion support via `prefers-reduced-motion`
- Minimum 48px touch targets
- High contrast (black/white) for readability

## 🚀 Deployment

Optimized for deployment on Vercel:

```bash
# Build the project
npm run build

# Deploy to Vercel
vercel deploy
```

### Performance Targets
- Lighthouse Score: 90+ across all metrics
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

## 📄 License

© 2024 GHXSTSHIP Industries LLC. All rights reserved.

---

**Built with bold design. Delivered with precision. GHXSTSHIP doesn't follow trends—we create them.**
